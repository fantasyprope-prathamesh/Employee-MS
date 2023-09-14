import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
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

  //------------------

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 back-color">
        <div className="d-flex justify-content-between px-4 py-4  width g-3 child-back">
          <img
            src={"http://localhost:8081/images/" + employee.image}
            className="rounded-circle "
          ></img>
          <div className="d-flex flex-column p-4 color justify-content-center">
            <div>
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

            <div className="d-flex p-4 ">
              <Link
                to={"http:///employeeDetail/" + employee.id}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button className="btn btn-success" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
