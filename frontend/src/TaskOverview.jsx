import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table } from "antd";
import "./allcss/TaskManagementCss.css";
import "./allcss/task.css"

const { Title, Paragraph, Text } = Typography;

const TaskOverView = () => {
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();
  //---------------------------------------------------------------------------------
   //------------------------------------------------------------------
  //----------------------------------------------------------------
  //Cookie authentication based on Role - Admin or Employee
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    console.log("Yeaapppppp")
    axios
      .get("http://localhost:8081/dashboard")
      .then((response) => {
        // navigate("/employeeDetail")
        console.log("Immmmmmmmmm",response)
        if (response.data.Status === "Successful") {
          if (response.data.Role === "Employee") {
            console.log("Employee heresss employee");
            navigate("/start");
          } else if (response.data.Role === "Admin") {
            console.log("Admin here")
            const id = response.data.id;
            navigate("/editEmployee/:empId");
          }
        } else if (response.data.Status == "Unsuccessful") {
          navigate("/start");
        }
      })
      .catch((err) => {
        console.log("I got error here")
        navigate("/start");

      });
  }, []);

  //------------------------------------------------------------------

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
      title: <span className="table-header">Task Id</span>,
      dataIndex: "task_id",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Employee Id</span>,
      dataIndex: "emp_id",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Employee Name</span>,
      dataIndex: "name",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Task Description</span>,
      dataIndex: "task_description",
      render: (text, record) => {
        return <div className="row-css" style={{maxWidth:"10rem"}}>{text}</div>;
      },
    },
    {
      title: <span className="table-header">Due Date</span>,
      dataIndex: "due_date",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Status</span>,
      dataIndex: "status",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Priority</span>,
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
              style={{ }}
              pagination={{pageSize:5}}
            ></Table>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskOverView;
