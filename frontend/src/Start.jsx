// Start.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Start.css";

const Start = () => {
  return (
    <div className="landing-container">
      <div className="background-shape"></div>
      <div className="content">
        <header className="header">
          <h1 className="logo">EMS</h1>
          <p className="tagline">Empowering Your Workforce</p>
        </header>
        <section className="login-section">
          <h2 className="login-heading">Sign in as</h2>
          <div className="button-container">
            <Link to={"/employeeLogin"} className="login-button employee-button">Employee</Link>
            <Link to={"/login"} className="login-button admin-button">Admin</Link>
          </div>
        </section>
        <section className="features-section " style={{marginTop:"3rem"}} >
          <h2 className="features-heading">Key Features</h2>
          <div className="feature-list-container" >
            <ul className="feature-list" >
              <li>Effortless Employee Management</li>
              <li>Secure and Seamless Admin Access</li>
              <li>Smart Task Assignment</li>
              <li>Streamlined Leave Management</li>
              {/* Add more key features */}
            </ul>
          </div>
        </section>
        <footer className="footer">
          <p className="ready-text" style={{color:"#0066ff"}}>Ready to revolutionize your workforce?</p>
        </footer>
      </div>
    </div>
  );
};

export default Start;




// // Start.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./Start.css";

// const Start = () => {
//   return (
//     <div className="landing-container">
//       <header className="header">
//         <h1 className="logo">EMS</h1>
//         <p className="tagline">Empowering Your Workforce</p>
//       </header>
//       <section className="login-section">
//         <h2 className="login-heading">Sign in as</h2>
//         <div className="button-container">
//           <Link to={"/employeeLogin"} className="login-button employee-button">Employee</Link>
//           <Link to={"/login"} className="login-button admin-button">Admin</Link>
//         </div>
//       </section>
//       <section className="features-section">
//         <h2 className="features-heading">Key Features</h2>
//         <ul className="feature-list">
//           <li>Effortless Employee Management</li>
//           <li>Secure and Seamless Admin Access</li>
//           <li>Smart Task Assignment</li>
//           {/* Add more key features */}
//         </ul>
//       </section>
//       <footer className="footer">
//         <p className="ready-text">Ready to revolutionize your workforce?</p>
//         <Link to={"/signup"} className="signup-link">Get Started</Link>
//       </footer>
//     </div>
//   );
// };

// export default Start;



// import React from 'react'
// import { Link } from 'react-router-dom';
// import "./Start.css"

// const Start = ()=> {
//   return (
//     <div className="login-container">
//       <h1>Login As</h1>
//       <div className="button-container">
//         <Link to={"/employeeLogin"} className="login-button employee-button">Employee</Link>
//         <Link to={"/login"} className="login-button admin-button">Admin</Link>
//       </div>
//     </div>

//   )
// }

// export default Start;