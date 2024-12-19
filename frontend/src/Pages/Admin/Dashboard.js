import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import "../../Dash.css";
import { Link } from "react-router-dom";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";
import SlickCarousel from '../User/ReviewCarroussel';



function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  

  return (
<div>
  <div className="sidebarDash">
    <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{width:'250px', height:'150px'}}></img>
    <div style={{paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold'}}>
    <a href="/dash">Dashboard</a>
    <a href="/dash/package">Packages</a>
    <a href="/dash/orders">Booking</a>
    <a href="/dash/users">Users</a>
    </div>
  </div>

  <div className="contentDash">
    <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px'}}>Dashboard</h2>
  
   <div className='slickcarousel'><SlickCarousel/></div>
  </div>
</div>
  );
}

export default Dashboard;
