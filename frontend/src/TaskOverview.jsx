import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table } from "antd";
import "./allcss/TaskManagementCss.css";

const { Title, Paragraph, Text } = Typography;

const TaskOverView = () => {
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();
  //---------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //just printing....
  useEffect(() => {
    if (taskData != null && taskData.length > 0) {
      console.log("Task Data :) : ", taskData);
    }
  }, [taskData]);
  //---------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  // Columns ..

  const columns = [
    {
      title: "Task Id",
      dataIndex: "task_id",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Employee Id",
      dataIndex: "emp_id",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Task Description",
      dataIndex: "task_description",
      render: (text, record) => {
        return <div style={{maxWidth:"10rem"}}>{text}</div>;
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
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text, record) => {
        if (text == "High") {
          return <div style={{ color: "red" }}>{text}</div>;
        } else if (text === "Medium") {
          return <div style={{ color: "orange" }}>{text}</div>;
        } else if (text === "Low") {
          return <div style={{ color: "green" }}>{text}</div>;
        }
      },
    },
  ];

  //-----------------------------------------------------------------------------------
  //Extracting data for Task Overview table..------------------------------------------
  const fetchTasks = () => {
    axios
      .get("http://localhost:8081/fetchTasksData")
      .then((res) => {
        if (res.data) {
          console.log("Task data got it!");
          // console.log(res.data);
          setTaskData(res.data);
          setLoading(false);
        } else {
          console.log("No data found!!");
        }
      })
      .catch((err) => {
        console.log("Err : ", err);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div style={{ marginTop: "2rem" }} className="container ">
        <Button
          className="animated-button"
          type="primary"
          onClick={() => {
            navigate("/assignnewtask");
          }}
        >
          Assign New Task
        </Button>
      </div>
      {/* //------------------------------------------------------------------------------ */}
      <div style={{ marginTop: "1rem" }}>
        <div className="container p-md-3 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table
              dataSource={taskData}
              columns={columns}
              style={{ border: "1px solid black" }}
            ></Table>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskOverView;
