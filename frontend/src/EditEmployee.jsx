import React, { useEffect } from "react";
import { resolvePath, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EditEmployee = () => {
  const { empId } = useParams(); // getting data from url
  const navigate = useNavigate();

  //----------------------------------------------------------------
  //Cookie authentication based on Role - Admin or Employee
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    console.log("Yeaapppppp")
    axios
      .get("http://localhost:8081/dashboard")
      .then((response) => {
        // navigate("/employeeDetail")
        console.log("Immmmmmmmmm",response)
        if (response.data.Status === "Successful") {
          if (response.data.Role === "Employee") {
            console.log("Employee heresss employee");
            navigate("/start");
          } else if (response.data.Role === "Admin") {
            console.log("Admin here")
            const id = response.data.id;
            navigate("/editEmployee/:empId");
          }
        } else if (response.data.Status == "Unsuccessful") {
          navigate("/start");
        }
      })
      .catch((err) => {
        console.log("I got error here")
        navigate("/start");

      });
  }, []);


  //----------------------------------------------------------------
  //state for managing input fields..
  const [empInfo, setEmpInfo] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
    image: "",
  });

  // handling form onSubmit event..

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("going to update form");

    //form data..
    const formData = new FormData();
    formData.append("name", empInfo.name);
    formData.append("email", empInfo.email);
    formData.append("address", empInfo.address);
    formData.append("salary", empInfo.salary);
    formData.append("image", empInfo.image);

    console.log("Name is : " + formData.get("name"));

    axios
      .put(`http://localhost:8081/updateCurrentEmployee/${empId}`, formData)
      .then((response) => {
        if (response.data.Status == "Success") {
          console.log("Data Updated Successufully");

          //redirect page to employee
          navigate("/employee");
        }
        // console.log(response.data.Status)
      })
      .catch((err) => {
        console.log("Got Eror from server");
      });
  };

  //---------------------------------------------------------------

  const [defaultData, setDefaultData] = useState([]);

  console.log("id :", empId);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getCurrentEmployee/${empId}`, {
        params: { Id: empId },
      })
      .then((response) => {
        if (response.data.Result.length > 0) {
          const [currData] = response.data.Result;

          console.log("cur : ", currData);

          setEmpInfo({
            ...empInfo,
            name: currData.name,
            email: currData.email,
            address: currData.address,
            salary: currData.salary,
          });
        } else {
          console.log("Empty Data");
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  console.log();

  //--------------------------------------------------------------

  return (
    <>
      <div className="container w-50 mt-5 border card" style={{backgroundColor:"#f2f2f2"}}>
        
        <div className="p-3" style={{display:'flex',justifyContent:"center",color:"#4d88ff",fontSize:"1.5rem",fontWeight:"500"}}>
          Update Employee 
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label" style={{fontWeight:"500"}}>
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, name: event.target.value });
              }}
              //default value..
              value={empInfo.name}
            />
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label" style={{fontWeight:"500"}}>
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, email: event.target.value });
              }}
              //default value..
              value={empInfo.email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="salary" className="form-label" style={{fontWeight:"500"}}>
              Salary:
            </label>
            <input
              type="text"
              className="form-control"
              id="salary"
              placeholder="Enter salary"
              name="salary"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, salary: event.target.value });
              }}
              //default value..
              value={empInfo.salary}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label" style={{fontWeight:"500"}}>
              Address:
            </label>
            <input
              type="address"
              className="form-control"
              id="address"
              placeholder="Enter address"
              name="address"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, address: event.target.value });
              }}
              //default value..
              value={empInfo.address}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="formFileDisabled"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, image: event.target.files[0] });
              }}

              //default value..
              // value={empInfo.image}
            />
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
