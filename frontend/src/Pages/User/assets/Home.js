import React, { useState, useEffect } from "react";
import styles from "../../App.css";
import { useParams, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import Whychoose from "./Whychoose";
import Packagedetails from "./Packagedetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./Landingpage";

const Home = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Initialize cart count to zero
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetch(`https://vacation-hut-0piq.onrender.com/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setUserName(data.user.name);
          
        
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  useEffect(() => {
    fetch("https://vacation-hut-0piq.onrender.com/allpackage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((packages) => packages.images[0].url);
        setImages(allImages);
      });
  }, []);

  

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }
  
    

  return (
    <div className="App">
      {/* <ResponsiveAppBar/> */}

      <LandingPage/>
     {/* <AppCarousel/>
      <h1 class="whychoose">Why Choose Vacation Hut</h1>
      <Whychoose/> */}
      {/* <div className="background">
      <h1 className="whychoose packagealign">Where will you get Authentic Experience</h1>
      <Packagedetails/>
      </div> */}
      {/* <Footer/> */}
    </div>
    // <main>
    //   <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
    //     Login
    //   </button>
    //   {isOpen && <Modal setIsOpen={setIsOpen} />}
    // </main>
  );
};

export default Home;
