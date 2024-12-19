import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../../Validation/signupvalidate";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";


function Signup() {
  const Navigate = useNavigate();
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError(Validation(name, email, password));
    try {
      if (error.name === "" && error.email === "" && error.password === "") {
        await axios.post("https://vacation-hut-0piq.onrender.com/signup", {
          name,
          email,
          password,
        });
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <ResponsiveAppBar/>
      <div className="loginalignment">
          <div className="d-flex justify-content-center align-items-center vh-100 signupmodel">
      <div className="bg-white p-3 w-25">
        <h1 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Sign Up</h1>
        <form action="" onSubmit={submit}>
          <div className="mb-3">
          <FontAwesomeIcon icon={faUser} />
            <label htmlFor="name" className="promo">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="form-control rounded-0"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            {error.name && <span className="text-danger"> {error.name}</span>}
          </div>
          <div className="mb-3">
          <FontAwesomeIcon icon={faGoogle} />
            <label htmlFor="email" className="promo">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control rounded-0"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            {error.email && <span className="text-danger"> {error.email}</span>}
          </div>
          <div className="mb-3">
          <FontAwesomeIcon icon={faLock} />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control rounded-0"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            {error.password && (
              <span className="text-danger"> {error.password}</span>
            )}
          </div>
          <button type="submit" className="btn w-100 loginbtn">
            Sign Up
          </button>
          {/* <Link to="/login" className="btn border w-100 loginbtn">
            Log In
          </Link> */}
        </form>
      </div>
      <img 
        src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685975299/hd_tourism-removebg-preview_1_dzauhs.png"
        className="signupimg">
        </img>
    </div>
    </div>
    <div className="loginfooter">
    <Footer/>
    </div>
    </div>
  );
}

export default Signup;
