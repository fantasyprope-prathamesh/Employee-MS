import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table } from "antd";
import "./allcss/TaskManagementCss.css";

const {Title} = Typography;

const AssignNewTask = () => {
  return (
    <>
      <div
        className="container p-3 mt-5 border border-1"
        style={{ width: "50%" }}
      >
        {/* Leave Type */}

        <Row>
          <Col span={12}>
            <Title level={4}>Leave Type :</Title>
          </Col>
          <Col span={12}>
            <Input placeholder="Leave type" ></Input>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>
        {/* Start Date */}
        <Row>
          <Col span={12}>
            <Title level={4}>Start Date :</Title>
          </Col>
          <Col span={12}>
            <Input placeholder="dd/mm/yyyy" ></Input>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>
        {/* End Date */}
        <Row>
          <Col span={12}>
            <Title level={4}>End Date :</Title>
          </Col>
          <Col span={12}>
            <Input placeholder="dd/mm/yyyy" ></Input>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>
        {/* Reason */}
        <Row>
          <Title level={4}>Reason :</Title>
        </Row>
        <Row>
          <Col span={24}>
            <Input
              placeholder="Enter Reason..."
              
            ></Input>
          </Col>
        </Row>
        {/* //---------------------------------------------------------------------- */}
        <br></br>

        {/* Submit and Cancel */}
        <Row>
          <Col span={12}>
            <Button type="primary">Submit</Button>
          </Col>
          <Col span={12}>
            <Button type="primary">Cancel</Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AssignNewTask;
