import React, { useEffect } from "react";
import { resolvePath, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const UpdateRequest = () => {
  return (
    <>
      <div className="container w-50 mt-5 border">
        {/* heading */}
        <div className="px-3 text-center">
          <h3>Update Employee </h3>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
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
            <label htmlFor="email" className="form-label">
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
            <label htmlFor="salary" className="form-label">
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
            <label htmlFor="address" className="form-label">
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

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRequest;
