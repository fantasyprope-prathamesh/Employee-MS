import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

  //-----
  axios.defaults.withCredentials = true;

    //state for storing current email and passwrod..
    const [values,setValues] = useState({
        email : '',
        password : '',
    })
    //navigating/..Hook
    const navigate = useNavigate();

    //state variable for error..
    const [error,setError] = useState('')

    //handle submit
    const handleSubmit = (event)=>{
        event.preventDefault();

        axios.post('http://localhost:8081/login', values )
        .then( (res)=>{
            if( res.data.Status === "Successful"){
                console.log( res.data.Status )
                //navigate to dashboard..
                navigate("/")
            }else{
                setError( res.data.Error )
            }
        } )
        .catch( err => console.log( err ));
        
    }

  return (
    <>
      <div>
        <section className="vh-100" style={{ background: "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="Images\loginImg1.jpg"
                        alt="login htmlForm"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div> 

                    {/* right (login section) */}
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        
                        {/* error showing */}
                        { error && 
                        <div className="errorShower">
                          { error }
                        </div> 
                        }
                        
                        {/* form */}
                        <form onSubmit={ handleSubmit } >

                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            ></i>
                            <span className="h1 fw-bold mb-0"> Admin Login </span>
                          </div>

                            {/* email inpout */}
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                              onChange={(event)=>{
                                return setValues({ ...values , email : event.target.value })
                              }}
                            />
                            <label className="form-label" htmlFor="form2Example17">
                              Email address
                            </label>
                          </div>
                            {/* password inpout */}
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              onChange={(event)=>{
                                return setValues({ ...values , password : event.target.value })
                              }}
                            />
                            <label className="form-label" htmlFor="form2Example27">
                              Password
                            </label>
                          </div>

                          <div className="pt-1 mb-4" >
                            <button
                              className="btn btn-dark btn-llg btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
