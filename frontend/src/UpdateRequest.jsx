import React, { useEffect } from "react";
import { resolvePath, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { Button, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const UpdateRequest = () => {
  const { id } = useParams();

  //state for managing input fields..
  const [empInfo, setEmpInfo] = useState({
    name: "",
    email: "",
    // password: "",
    address: "",
    salary: "",
    // image: "",
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
    // formData.append("password", empInfo.password);
    // formData.append("image", empInfo.image);

    axios
      .put("http://localhost:8081/sendEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getCurrentEmployee/${id}`)
      .then((res) => {
        if (res.data.Result.length > 0) {
          // console.log(res.data.Result[0].name);

          //extracting first row
          const [currentEmp] = res.data.Result;

          setEmpInfo({
            ...empInfo,
            name: currentEmp.name,
            email: currentEmp.email,
            // password: "",
            address: currentEmp.address,
            salary: currentEmp.salary,
            // image: "",
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }, []);

  // useEffect(()=>{
  //   if(currentEmp != null && currentEmp.length != 0){
  //     console.log("New : ");
  //     console.log(currentEmp);
  //   }
  // },[currentEmp])

  return (
    <>
      <div className="container w-50 mt-5 border">
        {/* heading */}
        <div className="px-3 text-center">
          <h3>Fill Data For Update</h3>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label for="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              // placeholder="Enter name"
              name="name"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, name: event.target.value });
              }}
              value={empInfo.name}
            />
          </div>

          <div className="mb-3 mt-3">
            <label for="email" className="form-label">
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
              value={empInfo.email}
            />
          </div>

          <div className="mb-3">
            <label for="salary" className="form-label">
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
              value={empInfo.salary}
            />
          </div>

          <div className="mb-3">
            <label for="address" className="form-label">
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
              value={empInfo.address}
            />
          </div>

          {/* <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="formFileDisabled"
              //onChange handling..
              onChange={(event) => {
                setEmpInfo({ ...empInfo, image: event.target.files[0] });
              }}
              
            />
          </div> */}

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRequest;
