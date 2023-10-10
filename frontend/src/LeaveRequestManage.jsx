import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table } from "antd";

const { Title, Paragraph, Text } = Typography;

const LeaveRequestManage = () => {
  //first fetch the leave data to show...........................................
  const [loading, setLoading] = useState(true);
  const [leaveData, setLeaveData] = useState([]);
  const navigate = useNavigate();
  const [currentLeaveRecord,setCurrentLeaveRecord] = useState({})

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
      title: "Id",
      dataIndex: "id",
      render: (text, record) => {
        return <div >{text}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: "empName",
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
        title: "Leave Type",
        dataIndex: "leaveType",
        render: (text, record) => {
          return <div>{text}</div>;
        },
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        render: (text, record) => {
          return <div>{text}</div>;
        },
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        render: (text, record) => {
          return <div>{text}</div>;
        },
      },
      {
        title: "Reason",
        dataIndex: "reason",
        render: (text, record) => {
          return <div style={{maxWidth:"10rem"}}>{text}</div>;
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        sorter: (a, b) => b.status.localeCompare(a.status),
        render: (text, record) => {
          return (
            text === "Rejected" ? <div style={{color:"red"}}>{text}</div> : <div style={{color:"blue"}}>{text}</div>
          );
        },
      },
      {
        title: "Last",
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
      This is leave management
      <div>
        <div className="container p-md-3 ">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Table dataSource={leaveData} columns={columns}
            style={{border:"1px solid black"}}
            ></Table>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveRequestManage;
