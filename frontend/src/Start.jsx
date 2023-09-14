import React from 'react'
import { Link } from 'react-router-dom';

const Start = ()=> {
  return (
    <div className='d-flex justify-content-center align-items-center border vh-100 back-color'>

      <div className='border px-4 py-4 rounded bg-light  w-25'>
        <h3 className='d-flex justify-content-center text-black-5'>Login As</h3>
        <div className='d-flex justify-content-between mt-5'>
            <Link to={"/employeeLogin"} className='btn btn-primary'>Employee</Link>
            <Link to={"/login"} className='btn btn-success'>Admin</Link>
        </div>

      </div>

    </div>
  )
}

export default Start;