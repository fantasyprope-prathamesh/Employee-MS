import React, { useEffect, useState, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./style.css";
import "./Start.css";
import { Table, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salaryCount, setSalaryCount] = useState();

  useEffect(() => {
    //request for adminCount...
    axios
      .get("http://localhost:8081/adminCount")
      .then((response) => {
        setAdminCount(response.data[0].admin);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //request for employeeCount...
    axios
      .get("http://localhost:8081/employeeCount")
      .then((response) => {
        setEmployeeCount(response.data[0].employee);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //request for salaryCount...
    axios
      .get("http://localhost:8081/salaryCount")
      .then((response) => {
        setSalaryCount(response.data[0].salary);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //------------------------------------------------------------------

  //Data set of admin ..

  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  //retrieve Admin Data..

  //  Memoized columns
  const columns = useMemo(
    () => [
      {
        title: <span style={{color:"blue"}}>Name</span>,
        dataIndex: "name",
        key: "name",
        render : (text,record)=>{
          return(
            <div style={{color:"black"}}>
              {record.name}
            </div>
          )
        }
      },

      {
        title: <span style={{color:"blue"}}>Email</span>,
        dataIndex: "email",
        render : (text,record)=>{
          return(
            <div style={{color:"black"}}>
              {text}
            </div>
          )
        }
      },
      {
        title: <span style={{color:"blue"}}>Action</span>,
        dataIndex: "action",
        render : (text,record)=>{
          return(
            <div>
              {text}
            </div>
          )
        }
      },
    ],
    []
  );

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8081/getAdmins")
        .then((res) => {
          if (res) {
            console.log("Admins are present");
            console.log(res.data);
            setAdminData(res.data);
            setLoading(false);
          } else {
            console.log("NO admins");
          }
        })
        .catch((err) => {
          console.log("Error from server");
        });
    };

    getData();
  }, []);

  useEffect(() => {
    console.log("admindata Yoo: ");
    console.log(adminData);
  }, [adminData]);

  return (
    <>
      <div>
        <div className="container mt-3  ">
          <div className="row g-3 py-3 justify-content-around">
            {/* admin */}
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 px-3 pt-1 pb-3 border ">
              <div className="text-center">
                <h3>Admin</h3>
              </div>
              <hr />
              <div className=" ">
                <h4>Total : {adminCount} </h4>
              </div>
            </div>
            {/* employee */}
            <div className="col col col-12 col-sm-6 col-md-4 col-lg-3 px-3 pt-1 pb-3 border">
              <div className="text-center">
                <h3>Employee</h3>
              </div>
              <hr />
              <div className=" ">
                <h4>Total : {employeeCount} </h4>
              </div>
            </div>
            {/* salary */}
            <div className="col col col-12 col-sm-6 col-md-4 col-lg-3 px-3 pt-1 pb-3 border">
              <div className="text-center">
                <h3>Salary</h3>
              </div>
              <hr />
              <div className=" ">
                <h4>Total : {salaryCount} </h4>
              </div>
            </div>
          </div>
        </div>

        {/* admin list */}
        <div className="mt-3 px-5 pt-2">
          {/* <h4 className="">List Of Admins</h4> */}
          <Title level={2} style={{ color: "#0052cc" }}>
            List Of Admins
          </Title>

          {loading && <div>Loading...</div>}

          {!loading && adminData.length === 0 && <div>No data available.</div>}

          {/* <table className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && adminData.length > 0 && (
              <tbody>
                {adminData.map((item, indx) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.action}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table> */}

          <Table
            dataSource={adminData}
            columns={columns}
            // style={{ border: "1px solid black" }}
            className="custome-table"
          ></Table>
        </div>
      </div>
    </>
  );
};

export default Home;
