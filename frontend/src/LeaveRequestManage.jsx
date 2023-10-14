import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import "./allcss/leave.css"
import { Row, Col, Typography, Button, Input, Table } from "antd";

const { Title, Paragraph, Text } = Typography;

const LeaveRequestManage = () => {


  //first fetch the leave data to show...........................................
  const [loading, setLoading] = useState(true);
  const [leaveData, setLeaveData] = useState([]);
  const navigate = useNavigate();
  const [currentLeaveRecord,setCurrentLeaveRecord] = useState({})

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
            navigate("/leaverequestmanage");
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

  const fetchLeaveData = () => {
    axios
      .get("http://localhost:8081/fetchLeaveData")
      .then((res) => {
        if (res.data) {
          console.log("leave data get it from frontend");
          console.log(res.data);

          setLeaveData(res.data);
          setLoading(false);
        } else {
          console.log("No data into frontend");
        }
      })
      .catch((err) => {
        console.log("Err " + err);
      });
  };
  

  useEffect(() => {
    
      fetchLeaveData();
    
  }, []);

  //------------------------------------------------------------------------
  const [rerender,setReRender] = useState(0);

  const requestForStatus = (record,status)=>{
    const empObj = {
      id : record.id,
      status : status
    }
    console.log(empObj.status)

    axios.post("http://localhost:8081/handleStatus" , empObj)
    .then((res)=>{
      if(res.data === "success"){
        // console.log("Yooooo");
        fetchLeaveData();
      }
    })
    .catch((err)=>{
      console.log("Err " , err);
    })
  }

  const handleApproav = (record)=>{
    requestForStatus(record,"yes");
  }

  const handleReject = (record)=>{
    requestForStatus(record,"no");
  }

  const handleEmail = (record)=>{
    axios.post("http://localhost:8081/handleLeaveEmail",record)
    .then((res)=>{
      console.log(res.data.Status);
    })
    .catch((err)=>{
      console.log("Err : " , err)
    })
  }

  //creating coilumn
  const columns = [
    {
      title: <span className="table-header">Id</span>,
      dataIndex: "id",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
      title: <span className="table-header">Name</span>,
      dataIndex: "empName",
      render: (text, record) => {
        return <div className="row-css">{text}</div>;
      },
    },
    {
        title: <span className="table-header">Leave Type</span>,
        dataIndex: "leaveType",
        render: (text, record) => {
          return <div className="row-css">{text}</div>;
        },
      },
      {
        title: <span className="table-header">Start Date</span>,
        dataIndex: "startDate",
        render: (text, record) => {
          return <div className="row-css">{text}</div>;
        },
      },
      {
        title: <span className="table-header">End Date</span>,
        dataIndex: "endDate",
        render: (text, record) => {
          return <div className="row-css">{text}</div>;
        },
      },
      {
        title: <span className="table-header">Reason</span>,
        dataIndex: "reason",
        render: (text, record) => {
          return <div style={{maxWidth:"10rem"}}className="row-css">{text}</div>;
        },
      },
      {
        title: <span className="table-header">Status</span>,
        dataIndex: "status",
        sorter: (a, b) => b.status.localeCompare(a.status),
        render: (text, record) => {
          return (
            text === "Rejected" ? <div style={{color:"red"}} className="row-css">{text}</div> : <div style={{color:"blue"}}>{text}</div>
          );
        },
      },
      {
        title: <span className="table-header">Last</span>,
        dataIndex: "lastOne",
        render : (text,record)=>{
          return(
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <Button type="primary" 
              onClick={()=>handleApproav(record)}
              >Approv</Button>
              <Button type="primary" style={{backgroundColor:"red"}}
              onClick={()=>handleReject(record)}
              >Reject</Button>
              <Button type="primary"  style={{backgroundColor:"orange"}}
              onClick={()=>handleEmail(record)}
              >Send Email</Button>
            </div>
          )
        }
      },
  ];

  //-----------------------------------------------------------------------

  return (
    <>

      <div>
        <div className="container p-md-3 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table dataSource={leaveData} columns={columns}
            // style={{}}
            className="card"
            ></Table>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveRequestManage;
