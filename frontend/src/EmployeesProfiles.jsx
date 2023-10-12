import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Link, Outlet, useNavigate , useParams } from "react-router-dom";
import axios from "axios";

const EmployeesProfiles = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8081/getCurrentEmployee/" + id)
      .then((res) => {
        setEmployee(res.data.Result[0]);
      })
      .catch((err) => [console.log(err)]);
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status == "Success") {
          navigate("/start");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 " >
      {/* style={{backgroundColor:"#d8d6f0"}} */}
        <div className="d-flex justify-content-between px-4 py-4  width g-3 " style={{backgroundColor:"#80aaff",boxShadow:"3px 3px 4px 0px #000066"}}>
          <img
            src={"http://localhost:8081/images/" + employee.image}
            style={{ width: "300px" }}
            // className="rounded-image"
          ></img>
          <div className="d-flex flex-column p-4 color justify-content-center">
            <div style={{color:"#661aff"}}>
              <h3>
                <span className="color-darker">Name : </span> {employee.name}
              </h3>
              <h3>
                <span className="color-darker">Email : </span> {employee.email}
              </h3>
              <h3>
                <span className="color-darker">Salary : </span>{" "}
                {employee.salary}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesProfiles;
