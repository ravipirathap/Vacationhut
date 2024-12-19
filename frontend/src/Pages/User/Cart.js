import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Checkout from "./Checkout";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
import '../../App.css'
import Review from "./Review";
import "./Checkout.css";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce((total, item) => total + item.price, 0);
    setTotalCost(cost);
  }, []);
  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  const searchParams = new URLSearchParams(useLocation().search);
  const itemsParam = searchParams.get("items");
  if (itemsParam) {
    try {
      const parsedItems = JSON.parse(itemsParam);
      setCartItems(parsedItems);
    } catch (error) {
      console.error("Error parsing cart items JSON:", error);
    }
  }

  return (
    <div className="cartfullbackground">
      <ResponsiveAppBar/>
      <div className="cart">
        <h1 className="cartheadalign" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Booking</h1>
      </div>
      <Table className="carttablealign" style={{ width: '70%', margin: '20px auto' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Image</h4>
            </TableCell>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Package Name</h4>
            </TableCell>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Price</h4>
            </TableCell>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Members</h4>
            </TableCell>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Date</h4>
            </TableCell>
            <TableCell style={{textAlign:'center'}}>
              <h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Actions</h4>
            </TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell style={{textAlign:'center'}}>
                <img src={item.image} alt={item.name} width={150} height={100} />
              </TableCell>
              <TableCell style={{textAlign:'center'}}>{item.name}</TableCell>
              <TableCell style={{textAlign:'center'}}>${item.price}</TableCell>
              <TableCell style={{textAlign:'center'}}>{item.count}</TableCell>
              <TableCell style={{textAlign:'center'}}>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <button onClick={() => handleRemoveItem(item)} className="landbtn" style={{paddingLeft:'10px', paddingRight:'10px', paddingBottom:'3px', paddingTop:'3px'}}>Remove</button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <h3
              className="carttotalalign"
              style={{
                fontFamily: 'Pacifico, cursive',
                color: '#4E0D0D',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}
            >
              Total Cost: ${totalCost}
            </h3>
          </TableRow>
        </TableBody>
      </Table>

      <div style={{ width: '100%' }}>
        <Checkout cartItems={cartItems} totalCost={totalCost} />
      </div>
      <div className="cartfooter">
        <Footer/>
      </div>
    </div>
  );
};

export default CartPage;
