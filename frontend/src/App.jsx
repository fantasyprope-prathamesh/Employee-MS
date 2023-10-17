import { useState } from "react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Employee from "./Employee.jsx";
import Profile from "./Profile.jsx";
import AddEmployee from "./AddEmployee.jsx";
import EditEmployee from "./EditEmployee.jsx";
import Start from "./start.jsx";
import EmployeeLogin from "./EmployeeLogin.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import UpdateRequest from "./UpdateRequest.jsx";
import EmployeesProfiles from "./EmployeesProfiles.jsx";
import LeaveRequestForm from "./LeaveRequestForm.jsx";
import LeaveRequestManage from "./LeaveRequestManage.jsx";
import TaskOverView from "./TaskOverview.jsx";
import AssignNewTask from "./AssignNewTask.jsx";
import TaskManager from "./taskmanager.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            {/* <Route path="/profile" element={<Profile />}></Route> */}
            <Route path="/addEmployee" element={<AddEmployee />}></Route>
            <Route path="/editEmployee/:empId" element={<EditEmployee />} />
            <Route path="/leaverequestmanage" element={<LeaveRequestManage/>}/>
            <Route path="/taskoverview" element={<TaskOverView/>}/>
            <Route path="/assignnewtask" element={<AssignNewTask/>}/>
          </Route>

          
          <Route path="/login" element={<Login />}></Route>
          <Route path="/start" element={<Start />}></Route>
          <Route path="/employeeLogin" element={<EmployeeLogin />}></Route>

          <Route path="/employeeDetail/:id" element={<EmployeeDetail />}>
            <Route path="" element={<EmployeesProfiles/>} />
            <Route path="leaverequest" element={<LeaveRequestForm/>} />
            <Route path="updaterequest" element={<UpdateRequest />} />
            <Route path="taskmanager" element={<TaskManager/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
