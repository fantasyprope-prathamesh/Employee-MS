import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { Row, Col, Typography, Button, Input, Table, Select } from "antd";
import "./allcss/TaskManagementCss.css";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;
const { Option } = Select;

const AssignNewTask = () => {
  //----------------------------------------------------------------------------
  const navigate = useNavigate();
  
  //States..
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  //----------------------------------------------------------------------------
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

  

  const [taskInfo, setTaskInfo] = useState({
    empId: "",
    taskDescription: "",
    dueDate: "",
    status: "--",
    priority: "",
  });

  const priorities = ["High", "Medium", "Low"];

  //===========================================================================[]

  useEffect(() => {
    if (options != null && options.length > 0) {
      console.log("options : ", options);
    }
  }, [options]);

  useEffect(() => {
    if (selectedOption != null && selectedOption.length > 0) {
      console.log("Selected option : ", selectedOption);

      const idName = selectedOption.split(",");
      // console.log("idName:",idName)
      setTaskInfo({
        ...taskInfo,
        // id : parseInt(idName[0],10),
        empId: idName[0],
      });
    }
  }, [selectedOption]);

  //Option=> employee data fetching..-------------------------------------------
  const fetchEmployees = () => {
    axios
      .get("http://localhost:8081/getEmployees")

      .then((response) => {
        if (response.data.Status === "Success") {
          setOptions(response.data.Result);
        } else {
          console.log("Error");
        }
        // console.log(data);
      })

      .catch((err) => console.log("No response from database"));
  };

  useEffect(() => {
    console.log("helo");

    fetchEmployees();
  }, []);
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  //handleSelectedOption

  const handleSelectedOption = (value) => {
    setSelectedOption(value);
    console.log("Valuee : ", value);
  };

  //-----------------------------------------------------------------------------------
  // handleAssignTask..

  const handleAssignTask = () => {
    console.log("all tasks : ", taskInfo);

    axios.post("http://localhost:8081/assignTask", taskInfo)
    .then((res)=>{
      if(res){
        console.log(res);
      }else{
        console.log("No data found")
      }
    })
    .catch((err)=>{
      console.log("Err during request");
    })

  };
  //------------------------------------------------------------------------------

  const handleDescriptionChange = (value) => {
    setTaskInfo({
      ...taskInfo,
      taskDescription: value,
    });
  };
  //----------------------------------------------------------------------------
  return (
    <>
      <div
        className="card container p-3 mt-5 border border-1"
        style={{ width: "50%" , backgroundColor:"#f2f2f2" }}
      >
        {/* Leave Type */}

        <Row>
          <Col span={12}>
            <Title level={4} style={{color:"#0066ff"}}>Employee :</Title>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select Employee"
              style={{ width: "15rem" }}
              onChange={handleSelectedOption}
              // value={selectedOption}
              // labelInValue
            >
              {options &&
                options.map((emp, indx) => {
                  let emploName = `Id: ${emp.id} ,  Name: ${emp.name}`;
                  let emploValue = `${emp.id},${emp.name}`;

                  return (
                    <Option
                      key={indx}
                      value={emploValue}
                      style={{ width: "max-content" }}
                    >
                      {emploName}
                    </Option>
                  );
                })}
            </Select>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>

        {/* Reason */}
        {/* <Row>
          <Title level={4}>Description :</Title>
        </Row> */}
        <Row>
          <Col span={12}>
            <Title level={4} style={{color:"#0066ff"}}>Description :</Title>
          </Col>
          <Col span={12}>
            <TextArea
              placeholder="Enter Description..."
              name="textarea"
              rows={3}
              cols={10}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Col>
        </Row>
        {/* //---------------------------------------------------------------------- */}
        <br></br>

        {/* Due Date -----------------------------------------------------------*/}
        <Row>
          <Col span={12}>
            <Title level={4} style={{color:"#0066ff"}}>Due Date :</Title>
          </Col>
          <Col span={12}>
            <Input
              placeholder="dd/mm/yyyy"
              onChange={(event) => {
                setTaskInfo({
                  ...taskInfo,
                  dueDate: event.target.value,
                });
              }}
            ></Input>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>
        {/* End Date */}
        <Row>
          <Col span={12}>
            <Title level={4} style={{color:"#0066ff"}}>Priority :</Title>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select Priority"
              style={{ width: "max-content" }}
              onChange={(value) => {
                setTaskInfo({
                  ...taskInfo,
                  priority: value,
                });
              }}
            >
              {priorities?.map((prio, indx) => {
                return (
                  <Option
                    key={indx}
                    value={prio}
                    style={{ width: "max-content" }}
                  >
                    {prio}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>

        {/* //---------------------------------------------------------------------- */}
        <br></br>

        {/* Submit and Cancel */}
        <Row>
          <Col span={12}>{/* <Button type="primary">Submit</Button> */}</Col>
          <Col span={12}>
            <Button type="primary" onClick={handleAssignTask}>
              Assign Task
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AssignNewTask;
