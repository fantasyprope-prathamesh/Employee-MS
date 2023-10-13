import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/dashboard")
      .then((response) => {
        // navigate("/employeeDetail")
        // console.log("Immmmmmmmmm")
        if (response.data.Result == "Successful") {
          if (response.data.Role === "Admin") {
            console.log("Immmmmmmmmm");
            navigate("/");
          } else if (response.data.Role === "Employee") {
            // console.log("Immmmmmmmmm")
            const id = response.data.id;
            navigate("/employeeDetail/" + id);
          }
        } else if (response.data.Result == "Unsuccessful") {
          navigate("/start");
        }
      })
      .catch((err) => {
        // console.log("I got error here")
        navigate("/start");
      });
  }, []);

  //handling logout..

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
                  <span className="fs-5 d-none d-sm-inline">
                    Admin Dashboard
                  </span>
                </a>

                {/*  */}
                <ul
                  className="dash-ul-all-color nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="nav-item ">
                    <Link to={"/"} className="nav-link align-middle px-0 ">
                      <i className="fs-4 bi-speedometer2"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                    </Link>
                  </li>

                  {/* Manage Employee */}
                  <li>
                    <Link
                      to={"/employee"}
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Manage Employee
                      </span>{" "}
                    </Link>
                  </li>

                  {/* Leave Management */}
                  <li>
                    <Link
                      to={"/leaverequestmanage"}
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Leave Management
                      </span>{" "}
                    </Link>
                  </li>

                  {/* Task Management -------------------------------------------- */}
                  <li>
                    <Link
                      to={"/taskoverview"}
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-people"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">
                        Task Management
                      </span>{" "}
                    </Link>
                  </li>


                  {/*Profile  -----------------------------------------------------*/}
                  {/* <li>
                    <Link
                      to={"/profile"}
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi-person"></i>{" "}
                      <span className="ms-1 d-none d-sm-inline">Profile</span>
                    </Link>
                  </li> */}

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
              <div className="border p-2  shadow"
              style={{
            display: "flex",
            justifyContent: "center",
            color: "#0055ff",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
              >
                <h4>Employee Management System</h4>
              </div>
              

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
