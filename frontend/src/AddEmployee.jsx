import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import axios from "axios";
import { Button } from "antd";

const AddEmployee = () => {
  //state for managing input fields..
  const [empInfo, setEmpInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    image: "",
  });

  //handling form onSubmit event..

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(empInfo.image);

    //axios request to server for inerting data..
    //form data..
    const formData = new FormData();
    formData.append("name", empInfo.name);
    formData.append("email", empInfo.email);
    formData.append("address", empInfo.address);
    formData.append("salary", empInfo.salary);
    formData.append("password", empInfo.password);
    formData.append("image", empInfo.image);

    axios
      .post("http://localhost:8081/addEmployee", formData)
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="container w-50 mt-2 border rounded"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        {/* heading */}

        <div
          className="p-2"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#4d88ff",
            fontSize: "1.5rem",
            fontWeight: "500",
          }}
        >
          Add Employee
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-1">
            <label
              for="name"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
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
            />
          </div>

          <div className="mb-3 mt-3">
            <label
              for="email"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
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
            />
          </div>

          <div className="mb-3">
            <label
              for="pwd"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, password: event.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <label
              for="salary"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
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
            />
          </div>

          <div className="mb-3">
            <label
              for="address"
              className="form-label"
              style={{ fontWeight: "500" }}
            >
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
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-2"
            style={{ fontWeight: "500" }}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
