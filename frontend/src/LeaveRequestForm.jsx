import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input } from "antd";

const { Title, Paragraph, Text } = Typography;

const LeaveRequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leaveInfoObj, setLeaveInfoObj] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status : "Pending"
  });

  useEffect(()=>{
    console.log("leave info :");
    console.log(leaveInfoObj)
  },[leaveInfoObj])

  //handling submit..................................................................

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8081/leaveRequest/${id}` ,  leaveInfoObj )
      .then((res) => {
        if (res) {
            console.log("response :")
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //-----------..........................................................................
  //handling cancel..
  const handleCancel = ()=>{
    navigate(`/employeeDetail/${id}`);
  }
  //-------------------------------------------------------------------------------------
  return (
    <>
      <p>id : {id}</p>
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
            <Input
              placeholder="Leave type"
              onChange={(evnet) => {
                setLeaveInfoObj({
                  ...leaveInfoObj,
                  leaveType: event.target.value,
                });
              }}
            ></Input>
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
            <Input placeholder="dd/mm/yyyy"
            onChange={(event)=>{
                setLeaveInfoObj({
                    ...leaveInfoObj , startDate : event.target.value
                })
            }}
            ></Input>
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
            <Input placeholder="dd/mm/yyyy"
            onChange={(event)=>{
                setLeaveInfoObj({
                    ...leaveInfoObj , endDate : event.target.value
                })
            }}
            ></Input>
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
            <Input placeholder="Enter Reason..."
            onChange={(event)=>{
                setLeaveInfoObj({
                    ...leaveInfoObj , reason : event.target.value
                })
            }}
            ></Input>
          </Col>
        </Row>
        {/* //---------------------------------------------------------------------- */}
        <br></br>

        {/* Submit and Cancel */}
        <Row>
          <Col span={12}>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LeaveRequestForm;
