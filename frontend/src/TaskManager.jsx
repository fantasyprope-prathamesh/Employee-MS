import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table, Select } from "antd";
import "./allcss/TaskManagementCss.css";
import TextArea from "antd/es/input/TextArea";

const TaskManager = () => {
  const { id } = useParams();
  const [myTasks, setMyTasks] = useState([]);
  //-----------------------------------------------------------------------------//

  useEffect(() => {
    if (myTasks != null && myTasks.length > 0) {
      console.log("My tasks : ", myTasks);
    }
  }, [myTasks]);

  //--------------------------------------------------------------------------------
  // fetching currecnt task data from perticular employee..-----------------------
  const FetchTasks = () => {
    axios
      .get(`http://localhost:8081/myTasks/${id}`)
      .then((res) => {
        if (res) {
          // console.log("My tasks : " , res.data);
          setMyTasks(res.data);
        } else {
          console.log("No data ");
        }
      })
      .catch((err) => {
        console.log("Error from backend");
      });
  };
  useEffect(() => {
    FetchTasks();
  }, []);
  //-------------------------------------------------------------------------------
  //------------------------------------------------------------------------------
  //handleStatus..

  const handleStatus = (code)=>{

    const codes = {
        code : code,
    }

    axios.put(`http://localhost:8081/updateTaskStatus/${id}`,codes)
    .then((res)=>{
        if(res){
            console.log(res);
            if(res == "success"){
                FetchTasks(); // for re-rendering to see real time data
            }
        }else{
            console.log("Something Wrong")
        }
    })
    .catch((err)=>{
        console.log("Err " , err);
    })
  }
  
  //-----------------------------------------------------------------------------
  //creating columns..

  const columns = [
    {
      title: "Task Description",
      dataIndex: "task_description",
      render: (text, record) => {
        return <div style={{ maxWidth: "10rem" }}>{text}</div>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "status",
      dataIndex: "status",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Change Status",
      // dataIndex: "task_description",
      render: (text, record) => {
        return (
          <div
            className="d-flex justify-content-between"
            style={{ maxWidth: "19rem" }}
          >
            <Button type="primary" onClick={() => handleStatus("blue")}>
              In Processs
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "red" }}
              onClick={() => handleStatus("red")}
            >
              Not Started
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => handleStatus("green")}
            >
              Complete
            </Button>
          </div>
        );
      },
    },
  ];

  //-------------------------------------------------------------------------------
  return (
    <>
      Task List..
      <div className="container border border-1 " style={{ maxWidth: "80%" }}>
        {myTasks && (
          <Table
            dataSource={myTasks}
            columns={columns}
            //   style={{maxWidth:"65%"}}
          ></Table>
        )}
      </div>
    </>
  );
};

export default TaskManager;
