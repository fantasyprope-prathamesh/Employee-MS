import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  //------------------------------------------------------------------

  //-----------------------------------------------------------------

  return (
    <>
      <div>
        <div className="container-fluid ">
          <div className="row flex-nowrap ">
            {/* left side bar */}
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark ">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 text-white min-vh-100">
                <a
                  href="#"
                  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                  <span className="" style={{fontSize:'1.2rem'}}>
                    Employee Dashboard
                  </span>
                </a>

                {/* dashboard */}
                <ul
                  className="dash-ul-all-color nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item ">
                    <Link to={""} className="nav-link align-middle px-0 ">
                      <i className="fs-4 bi-speedometer2"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                    </Link>
                  </li>

                  {/* leave request */}
                  <li>
                    <Link
                      to={"leaverequest"}
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Leave Request from
                      </span>{" "}
                    </Link>
                  </li>

                  {/* Task manager */}
                  <li>
                    <Link
                      to={"taskmanager"}
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Task Manager
                      </span>{" "}
                    </Link>
                  </li>

                  {/* update request */}
                  <li>
                    <Link
                      to={"updaterequest"}
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-person"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Update Request</span>
                    </Link>
                  </li>

                  {/*  */}
                  <li>
                    <Link
                      onClick={handleLogout}
                      href="#"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-power"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Log Out</span>{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* right portion area */}

            <div className="col p-0 m-0  ">
              <div className="border p-2 d-flex justify-content-center shadow">
                <h4>Employee Management System</h4>
              </div>

              <Outlet id={id} />

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default EmployeeDetail;
