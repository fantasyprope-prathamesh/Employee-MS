import express, { json, query, response } from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { error } from "console";

import dotenv from 'dotenv';
dotenv.config();


// const mysql = require("mysql");
import nodemailer from "nodemailer";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend app
    methods: ["PUT", "POST", "GET", "DELETE"], // Add any other methods you use
    credentials: true, // Allow cookies and credentials
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// const bodyParser = require('body-parser');
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//----------------------------------------------------------

//--------------------------------------------------------
// Apis imports ..
import FetchTasks from "./Apis/FetchTasks.js"
import AssignTask from "./Apis/AssignTask.js";
import MyTasks from "./Apis/MyTasks.js";
import UpdateTaskStatus from "./Apis/UpdateTaskStatus.js";


//----------------------------------------------
//creating connection..
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password : "Charlie@coder0101",
  database: "signup",
  port: 3306,
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//-================= Employee Login =================================================

app.post("/employeeLogin", (req, res) => {
  const sql = "select * from employee where email = ?";

  con.query(sql, [req.body.email], (err, result1) => {
    if (err) return res.json({ Status: "Error during query" });

    if (result1.length > 0) {
      const storedHash = result1[0].password;

      bcrypt.compare(req.body.password, storedHash, (err, result2) => {
        if (result2) {
          const token = jwt.sign(
            { Role: "Employee", id: result1[0].id },
            "key-id",
            { expiresIn: "1d" }
          );
          res.cookie("Token", token);

          return res.json({ Result: "Successful", id: result1[0].id });
        } else {
          return res.json({
            Result: "Unsuccessful",
            Error: "Invalid credentials",
          });
        }
      });
    } else {
      return res.json({
        Result: "Unsuccessful",
        Error: "No Data found for the given email",
      });
    }
  });
});

//========================================================================

//post api..handling login page--------------------------------------
app.post("/login", (request, response) => {
  // const vari = request.body.email;
  //     return response.json({vari});

  const que = "select * from users where email = ? and password = ?";
  con.query(que, [request.body.email, request.body.password], (err, result) => {
    if (err)
      return response.json({ Status: "Error", Error: "Error in server" });

    if (result.length > 0) {
      //jwt token creation..

      const token = jwt.sign({ Role: "Admin" }, "key-id", { expiresIn: "1d" });

      //..writing cookies and seding as a response..
      // response.cookie("token", token);
      response.cookie("Token", token);

      return response.json({ Status: "Successful", Result: result });
    } else {
      return response.json({ Status: "Error", Error: "No data present" });
      // return response.json({ Status : data })
    }
  });
});
//---------------------------------------------------------------------------------
//request for checking jwt cookie authentication..------------------------

const verifyUser = (req, res, next) => {
  const token = req.cookies.Token;

  if (!token) {
    console.log("No token");
    req.Status = "Unsuccessful";
    return res.json({ Status : "Unsuccessful" });
  } else {
    
    jwt.verify(token, "key-id", (error, decoded) => {
      if (error) {
        console.log("Token verification error:", error);
        return res.json({ Status : "Unsuccessful" });
      }
      console.log("Verification Success")

      req.Status = "Successful";
      req.role = decoded.Role;
      req.id = decoded.id;

      // return res.json({Status : req.Status , Role : req.role})
      next(); // Call next to proceed to the next middleware or route handler
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  console.log("Status: " + req.Status);
  console.log("Role: " + req.role);

  const result = req.Status;
  const id = req.id;
  const role = req.role;

  return res.json({ Status: result, Id: id, Role: role });
});


// const verifyUser = (req, res, next) => {
//   const token = req.cookies.Token; // .token is a key word which we provided during creating cookies into the /login request check it
//   console.log("see token : " , token)

//   if (!token) {
//     console.log("Not token")
//     req.Status = "Unsuccessful";

//     // next();
//   } else {
//     console.log("token present:)")
//     jwt.verify(token, "key-id", (error, decoded) => {
//       if (error) return res.json({ Error: "Not Authenticated" });

//       // req.json({Status:"Successful"})
//       req.Status = "Successful";
//       req.role = decoded.Role;
//       req.id = decoded.id;

//       // next(); //i think this next() call means /dashboard request function
//     });
//   }
// };
// app.get("/dashboard", verifyUser, (request, response) => {
//   console.log(request.Status)
//   const result = request.Status;
//   // console.log(result);

//   console.log("role : " + req.role);
//   return response.json({ Result: result, Id: req.id, Role: req.role });
// });

//-----------------------------------------------------

//logout with clearing cookie.

app.get("/logout", (req, res) => {
  res.clearCookie("Token");
  return res.json({ Status: "Success" });
});

//handling AddEmployee page and inserting data into db.-------------

app.post("/addEmployee", upload.single("image"), (request, response) => {
  const sql =
    "insert into employee (name,email,address,salary,password,image) value(?)";

  bcrypt.hash(request.body.password.toString(), 10, (err, hash) => {
    if (err) response.json({ Erro: "Error while hashing the password" });

    const values = [
      request.body.name,
      request.body.email,
      request.body.address,
      request.body.salary,
      hash,
      request.file.filename,
    ];

    con.query(sql, [values], (err, result) => {
      if (err) response.json({ Error: "Error inside signup query" });

      return response.json({ Status: "Success :)" });
    });
  });
});

//--------------------------------------------------
//api for fetching employees from db..

app.get("/getEmployees", (request, response) => {
  const sql = "select * from employee";

  con.query(sql, (err, result) => {
    if (err) return response.json({ Error: "Error during select operation" });

    console.log("empooo data : ", result)
    return response.json({ Status: "Success", Result: result });
  });
});

//-------------------------------------------------------------

//EditEmployee requests..

//sending perticular employee data for updation..

app.get("/getCurrentEmployee/:id", (request, response) => {
  // const idValue = request.query.Id;
  const idValue = request.params.id;
  //   console.log(idValue);

  const sql = "select * from employee where id = ?";

  con.query(sql, [idValue], (err, result) => {
    if (err) return response.json({ Error: "Error during query" });

    if (result.length > 0) {
      return response.json({ Status: "Successful", Result: result });
    } else {
      console.log("No Data");
    }
  });
});

// updateCurrentEmployee

app.put("/updateCurrentEmployee/:empId", upload.single("image"), (req, res) => {
  const Id = req.params.empId;

  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
    req.file ? req.file.filename : null,
  ];

  // console.log(req.body.name);

  const sql = "UPDATE employee SET name = ?,email = ?,address = ?,salary = ?,image = COALESCE(NULLIF(?, NULL), image) WHERE id = ?";
    // "update employee set name = ? , email = ? , address = ? , salary = ? , image = COALESCE(NULIF(?,'),image) where id = ?";

  if (values) {
    con.query(sql, [...values, Id], (err, result) => {
      if (err) return res.json({ Error: "Error during sql qury.." });

      return res.json({
        Status: "Success",
        Result: "Data updated successfully",
      });
    });
  }
});

//Delete current employee..

app.delete("/deleteCurrentEmployee/:id", (request, response) => {
  const Id = request.params.id;

  console.log(Id);

  const sql = "delete from employee where id = ?";

  con.query(sql, [Id], (err, result) => {
    if (err) return response.json({ Status: "Erro during deletion!!" });

    return response.json({ Status: "Success" });
  });
});

//-============================================================================================

//Dashboard request => adminCount , employeeCount , salaryCount ...

//=============================================================================================

//====================  adminCount ============================

app.get("/adminCount", (req, res) => {
  const sql = "select count(id) as admin from users";

  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: "Err during query !!" });

    return res.json(result);
  });
});

//====================  employeeCount ============================

app.get("/employeeCount", (req, res) => {
  const sql = "select count(id) as employee from employee";

  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: "Err during query !!" });

    return res.json(result);
  });
});

//====================  salaryCount ============================

app.get("/salaryCount", (req, res) => {
  const sql = "select sum(salary) as salary from employee";

  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: "Err during query !!" });

    return res.json(result);
  });
});

//----------------------- Email seding.. -----------------------------
app.put("/sendEmail", upload.none(), (req, res) => {
  const values = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    salary: req.body.salary,
  };

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
  });

  let details = {
    from: "prathameshasynchronouslife@gmail.com",
    to: "prathameshpatil.parite@gmail.com",
    subject: "Testing our email feature",
    text: `name : ${values.name}\nemail : ${values.email}\naddress : ${values.address}\nsalary : ${values.salary}`,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("Error during sendMail:", err);
      return res.json({ status: "error" });
    } else {
      console.log("Mail has been sent successfully :)");
      return res.json({ status: "success" });
    }
  });
});

//=============================================================================================
// getAdmins..

app.get("/getAdmins", (req, res) => {
  const sql = "select id,  name , email , action from users";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: "Failed to retrieve data" });
    }
    // console.log(result);
    return res.json(result);
  });
});

//----------------------------------------------------------------------------------------------
  //Storing leave information into db..
  app.post("/leaveRequest/:id", (req, res) => {
    // Check if request has a body
    if (req.body) {
      const sql1 = "SELECT name, email FROM employee WHERE id = ?";
      con.query(sql1, [req.params.id], (err, result1) => {
        if (err) {
          console.log("Error during query execution:", err);
          res.status(500).send("Internal Server Error");
        } else {
          if (result1.length > 0) {
            const { name, email } = result1[0];
  
            const sql2 =
              "INSERT INTO leaveinfo(empName, leaveType, startDate, endDate, reason, status) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [name, req.body.leaveType, req.body.startDate, req.body.endDate, req.body.reason, req.body.status];
  
            con.query(sql2, values, (err2, result2) => {
              if (err2) {
                console.log("Something went wrong during the second insert query:", err2);
                res.status(500).send("Internal Server Error");
              } else {
                console.log("Data inserted successfully :)");
                // return res.json({Status : "Successfully inserted emp"})
                res.status(200).send("Leave request submitted successfully");
              }
            });
          } else {
            console.log("No employee data found for the given ID");
            res.status(404).send("Employee not found");
          }
        }
      });
    } else {
      console.log("No data in the request body");
      res.status(400).send("Bad Request");
    }
  });
  
//------------------------------------------------------------------------------------------------
// fetching data from leaveinfo table..

  app.get("/fetchLeaveData" , (req,res)=>{
    const sql = "select id, empName,leaveType,startDate,endDate,reason,status from leaveinfo";

    con.query(sql,(err,result)=>{
      if(err){

        console.log("Error during query")
        res.status(500).send("Error during query")
      }else if(result.length > 0){
        console.log("Data fetch successfullly");
        return res.json(result)
      }else{
        console.log("No data found")
        res.status(404).send("No data fround!!")
      }
    })
  })

//----------------------------------------------------------------------------------------------
//handle Status of leave

app.post("/handleStatus" , (req,res)=>{
  console.log(req.body.id,req.body.status);
  const id = req.body.id;
  let status = "";
  if(req.body.status === "yes"){
    status = "Approved";
    console.log(status,id)
  }else if(req.body.status === "no"){
    status = "Rejected";
  }else{
    status = "Pending";
  }

  const sql = "update leaveinfo set status = ? where id = ?";
  con.query(sql,[status,id],(err,result)=>{
    console.log("inside querryy")
    if(err){
      res.status(500).send("Error during query..");
    }
    else if(result.affectedRows > 0){
      console.log("Status changed successfully")
      res.status(200).send("success")
    }
  })

})
//------------------------------------------------------------------------------------------------
//Manage Leave email..
app.post("/handleLeaveEmail",(req,res)=>{
  console.log("here i am>:",req.body)

  //hr finding...
  let admin = "";
  const sql = "select name from users where action = ?";
  con.query(sql,["hr"],(err,result)=>{
    if(err){
      res.status(500).send("Erro during query..")
    }else if(result){
      admin = result[0].name
      console.log('admin',result[0].name)
    }

    // console.log('admin',result.body)
  })

  const values = {
    name: req.body.empName,
    type: req.body.leaveType,
    start: req.body.startDate,
    end: req.body.endDate,
    admin : admin,
    status : req.body.status,
  };

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
  });

  let details = {
    from: "prathameshasynchronouslife@gmail.com",
    to: "prathameshpatil.parite@gmail.com",
    subject: "Testing our email feature",
    text: `Subject : Leave Request Approval\n
           Dear : ${values.name}\n
           Your leave request has been ${values.status}\n
           Details : \n
           - Leave Type : ${values.type}\n
           - Start Date : ${values.start}\n
           - End Date   : ${values.end}\n
           Best Regards ,\n
           ${values.admin}`,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("Error during sendMail:", err);
      return res.json({ status: "error" });
    } else {
      console.log("Mail has been sent successfully :)");
      return res.json({ status: "success" });
    }
  });
})

//----------------------------------------------------------------------------------------------
  app.get("/fetchTasksData",(req,res)=>{
    FetchTasks(req,res,con);
  })
//-----------------------------------------------------------------------------------------------
//add tasks..

app.post("/assignTask",(req,res)=>{
  AssignTask(req,res,con);
})  

//------------------------------------------------------------------------------
//my tasks..
app.get("/myTasks/:id",(req,res)=>{
  MyTasks(req,res,con)
})

//---------------------------------------------------------------------------------------
app.put("/updateTaskStatus/:id",(req,res)=>{
  UpdateTaskStatus(req,res,con);
})

//---------------------------------------------------------------------------------
//start server..

app.listen(8081, () => {
  console.log("Server is Running");
});
