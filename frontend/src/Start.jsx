import React from 'react'
import { Link } from 'react-router-dom';
import "./Start.css"

const Start = ()=> {
  return (
    <div className="login-container">
      <h1>Login As</h1>
      <div className="button-container">
        <Link to={"/employeeLogin"} className="login-button employee-button">Employee</Link>
        <Link to={"/login"} className="login-button admin-button">Admin</Link>
      </div>
    </div>

  )
}

export default Start;