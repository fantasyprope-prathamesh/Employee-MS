import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import "./allcss/task.css"
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  // custome hover effect for btn..
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const customBtn = {
    boxShadow: isHover ? "0 5px 10px rgb(54, 84, 133)" : "none",
  };

  //----------------------------------------------------------------

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("helo");

    axios
      .get("http://localhost:8081/getEmployees")

      .then((response) => {
        if (response.data.Status === "Success") {
          setData(response.data.Result);
        } else {
          console.log("Error");
        }
        console.log(data);
      })

      .catch((err) => console.log("No response from database"));
  }, []);

  //-----------------------------------------------------------------

  //handling delete operation..
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/deleteCurrentEmployee/${id}`)
      .then((response) => {
        if (response.data.Status == "Success") {
          window.location.reload(true);
          console.log("Record Deleted Successfully");
        }
      })
      .catch((error) => {
        console.log("Record deletion failed!!");
      });
  };

  //------------------------------------------------------------------

  return (
    <>
      <div className="container ">
        <div className="py-3 text-center" style={{ color: "#8533ff" }}>
          <h4>Employee List</h4>
        </div>
        <div className="">
          <Link
            to={"/addEmployee"}
            className="btn btn-primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={customBtn}
          >
            Add Employee
          </Link>

          {/* employee records  */}
          <div className="mt-3 rounded-5">
            <table className="table ">
              <thead>
                <tr>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Name
                  </th>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Image
                  </th>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Email
                  </th>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Address
                  </th>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Salary
                  </th>
                  <th
                    className="employee-table-heading"
                    style={{ color: "#8533ff" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.map((currEle, index, arr) => {
                  const { id, name, email, address, salary, password, image } =
                    currEle;

                  return (
                    <>
                      <tr key={id}>
                        <td >{name}</td>
                        <td>
                          <img
                            src={`http://localhost:8081/images/${image}`}
                            className="employee_image_css"
                            alt="employee"
                          ></img>
                        </td>
                        <td>{email}</td>
                        <td>{address}</td>
                        <td>{salary}</td>
                        <td>
                          <Link
                            to={`/editEmployee/${id}`}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => handleDelete(id)}
                            className="btn btn-danger btn-sm me-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
