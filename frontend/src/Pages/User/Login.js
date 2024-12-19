import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../../Validation/loginvalidate";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
import '../../App.css'



function Login() {
  const Navigate = useNavigate();
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function submit(e) {
    e.preventDefault();
    setError(null);
    await setError(Validation(email, password));
    try {
      if (error && error.email === "" && error.password === "") {
        const response = await axios.post("https://vacation-hut-0piq.onrender.com/login", {
          email,
          password,
        });
        const { data, userId, redirectTo } = response.data;
        localStorage.setItem("token", data);
        localStorage.setItem("userId", userId);
        if (redirectTo === "http://localhost:3000/dash") {
          Navigate("/dash/package");
        } else {
          Navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  
  
  return (
    <div>
      <ResponsiveAppBar/>
      <div className="loginalignment">
    <div className="d-flex justify-content-center align-items-center vh-100 loginmodel">
      <div className="bg-white p-3 w-25">
        <h1 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Log In</h1>
        <form action="" onSubmit={submit}>
          <div className="mb-3">
          <FontAwesomeIcon icon={faGoogle} />
            <label htmlFor="email" className="promo">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control rounded-0"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
            ></input>
            {error.email && <span className="text-danger"> {error.email}</span>}
          </div>
          <div className="mb-3">
          <FontAwesomeIcon icon={faLock} />
            <label htmlFor="password" className="promo">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control rounded-0"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
            ></input>
            {error.password && (
              <span className="text-danger"> {error.password}</span>
            )}
          </div>
          <button type="submit" className="btn w-100 loginbtn">
           <span> Log in </span>
          </button><br/><br/><br/>
          
          {/* <p>You are agree our terms and conditions</p> */}
          <Link to="/Signup" className="btn border w-100 loginbtn">
          <span>  Create Account</span>
          </Link>
        </form>
      </div>
      <div>
        <img 
        src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685975299/hd_tourism-removebg-preview_1_dzauhs.png"        alt="Login image"
        className="loginimg">
        </img>
      </div>
      
    </div>
    </div>
    <div className="loginfooter">
    <Footer/>
    </div>
    </div>
  );
}

export default Login;
