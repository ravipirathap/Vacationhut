import React, { useEffect } from 'react';
import "../../Edit.css";
import Packagedetails from "./Packagedetails";
import Footer from "./Footer";
import "./styles.css";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Card from "./Card";
import CardNewsDemo from "./CardNewsDemo";
import { config } from "react-spring";
import Carroussel from "./Carroussel";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import SlickCarousel from './ReviewCarroussel';


const useStyles = makeStyles((theme) => ({
  transparentNavbar: {
    backgroundColor: 'rgba(240, 224, 218, 0.7)', // Transparent version of rgb(240, 224, 218)
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 3,
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    marginInlineStart: 'auto',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(20), // Adjust the right padding as needed

  },
  logo: {
    width: 100, // Adjust the size of the logo as needed
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'brown', // Set the font color to brown
    padding: theme.spacing(1),
    paddingRight: theme.spacing(20), // Adjust the left padding as needed

  },
  linkItem: {
    marginLeft: theme.spacing(3),
  },

  paperContainer: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '25px',
    padding: theme.spacing(3),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', // Add shadow effect
    maxWidth: '370px', // Limit maximum width
    height: '370px', // Set height
  },
}));
  // Add additional styles for logo and navigation links if needed



const LandingPage = () => {
  const [cards , setCards] = useState([])
  useEffect(() => {
    fetchImageUrls();
  },[])
  const fetchImageUrls = () => {
    fetch("https://vacation-hut-0piq.onrender.com/allpackage")
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.data)){
        const cardsData = data.data.map(item =>{
          return{
            key:uuidv4(),
            content:<CardNewsDemo image = {item.images[0].url} packagename = {item.package}
price = {item.totalprice} id = {item._id}/>}
        })
        setCards(cardsData)
      } else{
        console.log("data is not an array")
      }
    })
    .catch(error =>{
      console.log("error fetching data")
    })
  }
  
  const classes = useStyles();


  return (
    <div className="landing-page">
      <header id="header">
    {/* BEGINING OF NAVBAR */}
    <nav className={classes.transparentNavbar}>
  <Grid container alignItems="center">
    <Grid item xs={6} md={3} className={classes.navBrand}>
      <Link href="#">
        <img
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png"
          alt="Vacation Hut Logo"
          className={classes.logo}
        />
      </Link>
    </Grid>
    <Grid item xs={6} md={9} className={classes.navLinks}>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <Link href="/" style={{ color: 'brown',  fontFamily:"Fira Sans, sans-serif" // Add this line
 }}>Home</Link>
        </Grid>
        <Grid item>
          <Link href="/login" className={classes.linkItem} style={{ color: 'brown' }}>
            Login
          </Link>
        </Grid>
        <Grid item>
          <Link href="/cart" className={classes.linkItem} style={{ color: 'brown' }}>
            Booking
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</nav>

    {/* END OF NAVBAR */}
    {/* BEGINING OF HERO SECTION */}
    {/* <section id="hero">
      <h1 className="hero--header">Discover Amazing places in Jaffna</h1>
      
    </section> */}
    {/* END OF HERO SECTION */}
  </header>
  {/* END OF HEADER */}

<main>
  {/* BEGINING OF BENEFITS SECTION */}
  <section id="benefits" style={{ backgroundColor: 'rgba(239, 231, 228, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '5px', padding: '25px' }}>
  <h2 className="benefits--header" style={{ fontFamily: 'Pacifico, cursive' }}>Your <span style={{ fontWeight: 'bold' }}>Dream Vacation</span> Awaits at <span style={{ fontWeight: 'bold', color:'#ff3e00' }}>Vacation</span> <span style={{ fontWeight: 'bold', color:'#5e4f47' }}>Hut</span></h2>
  <div className="benefit--cards">
  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Authentic destinations</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685992965/hd_destinations2222-removebg-preview_wrxipz.png" alt="Location icon" className="icons" />
          <p className='hdtext'>Our dedication lies in providing our customers with truly authentic experiences in various destinations.</p>
        </div>
        {/* <div className="overlay">
          <div>We carefully select activities and attractions that capture the true spirit of the destination, guaranteeing our customers unforgettable moments and lasting memories.</div>
        </div> */}
      </div>
    </div>
  </Paper>
  
  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Pre designed packages</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685998553/hd_package_22-removebg-preview_bbdncj.png" alt="Package icon" className="icons" />
          <p className='hdtext'>We offer unique and attractive packages, allowing our customers to fully immerse themselves in the culture and essence of each place they visit.</p>
        </div>
        {/* <div className="overlay">
          <div>Our primary goal is to ensure that every aspect of our packages contributes to an authentic experience. With meticulous design and curation.</div>
        </div> */}
      </div>
    </div>
  </Paper>

  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Better transportation</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685998951/hd_transportations-removebg-preview_alqd2h.png" alt="Transport icon" className="icons transporticon" />
          <p className='hdtext transporthdtext'>We offer a variety of transportation options to cater to different needs and preferences, including bicycles, autos, cars, and vans.</p>
        </div>
        {/* <div className="overlay">
          <div>Whether you prefer the eco-friendly and leisurely pace of a bicycle ride, the convenience of an auto, the comfort and flexibility of a car, or the spaciousness of a van, we have got you covered.</div>
        </div> */}
      </div>
    </div>
  </Paper>

  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Traditional foods</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685999299/hd_food222-removebg-preview_uwub0y.png" alt="Food icon" className="foodicons" />
          <p className='hdtext foodhdtext'>We offer exceptional food facilities, providing you with delicious meals for breakfast, lunch, and dinner.</p>
        </div>
        {/* <div className="overlay">
          <div>Join us in experiencing the culinary delights on offer and embark on a gastronomic adventure that will tantalize your taste buds and leave you craving for more.</div>
        </div> */}
      </div>
    </div>
  </Paper>

  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Affordable price</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686130990/hd_affordable_price_55-removebg-preview_m8bheg.png" alt="Cost icon" className="icons" />
          <p className='hdtext'>Experience the convenience of booking our packages at affordable prices through our user-friendly website.</p>
        </div>
        {/* <div className="overlay">
          <div>Start exploring and book your dream vacation today with confidence, knowing that our affordable prices won't compromise the quality and satisfaction you deserve.</div>
        </div> */}
      </div>
    </div>
  </Paper>

  <Paper className={classes.paperContainer}>
    <div className=" overlaycontainer">
      <div>
        <div>
          <h3 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Better experience</h3>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686000136/hd_experience-removebg-preview_rj2tip.png" alt="Experience icon" className="icons" />
          <p className='hdtext'>We strive to provide you with genuine and immersive travel experiences that go beyond the ordinary. </p>
        </div>
        {/* <div className="overlay">
          <div>Explore fascinating destinations, engage with local cultures, and discover hidden gems that showcase the essence of each place you visit. </div>
        </div> */}
      </div>
    </div>
  </Paper>
  </div>
</section>


    {/* END OF BENEFITS SECTION */}
    {/* <Carousel/> */}
    <div className="glassmorphism-container">

    <div className="background">
    <div className="glassmorphism-content">
      <h1 className="whychoose packagealign" style={{ fontFamily: 'Pacifico, cursive' }}>Where will you get<span style={{ fontWeight: 'bold' }}> Authentic Experience</span></h1>
      {/* <Packagedetails/> */}
      </div>
      </div>
      <div className='carouselalign'>
       
      <Carroussel
        cards={cards}
        height="500px"
        width="90%"
        margin="100px auto"
        offset={2}
        showArrows={false}
        className="custom-carousel" // Add a custom class here

      />
    </div>
    <div className='slickcarousel'><SlickCarousel/></div>
    </div>
      <div>
        <Footer/>
      </div>
    
    </main>
    </div>
  );
};


export default LandingPage;
