import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
const pages = [
  ['Home', '/'],
  ['Login', '/login'],
  ['Booking', '/cart'],
];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Initialize cart count to zero
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
    fetch("https://vacation-hut-0piq.onrender.com/allpackage")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((packages) => packages.images[0].url);
        setImages(allImages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleAddToCart = (id, packageName, discription, price) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const duplicates = cart.filter((cartItem) => cartItem._id === id);
    if (duplicates.length === 0) {
      const activityToAdd = {
        _id: id,
        packageName: packageName,
        discription: discription,
        price: price,
        count: 1,
      };
      cart.push(activityToAdd);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
    }
  };
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
    <AppBar position="static" sx={{ background: 'linear-gradient(to right,#ffffff, #ECDACD,  #E6C4AC)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 120,
              fontFamily: "Fira Sans, sans-serif", // Add this line
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#4E0D0D',
              textDecoration: 'none',
            }}
          >
            <img src='https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png' alt='Vacation Hut Logo' style={{ height: '50px', width: 'auto' }}></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#4E0D0D"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="#4E0D0D" fontFamily="Fira Sans, sans-serif">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: "Fira Sans, sans-serif", // Add this line
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#4E0D0D',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                component={Link}
                to={page[1]}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#4E0D0D', display: 'block', fontFamily: "Fira Sans, sans-serif" }} // Add this line
              >
                {page[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
