import React, { useState, useEffect } from "react";
import axios from "axios";
// import { response } from "express";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";


function ProductPage(props) {
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://vacation-hut-0piq.onrender.com/dash/activity/${id}`);
        setProduct(response.data.data);
        // console.log(response.data.data)
      } catch (error) {
      }
    };
    fetchProduct(id);
  }, [id]);
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = () => {
    setCartItems((prevItems) => [...prevItems, product]);
  };
  const handleCheckout = async () => {
    try {
      const order = {
        items: cartItems.map((item) => ({ product: item._id })),
      };
      const response = await axios.post("https://vacation-hut-0piq.onrender.com/dash/orders", order);
      window.location.href = `/orders/${response.data._id}`;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <ResponsiveAppBar/>
    <div>
      {/* <h1>{product.activityname}</h1> */}
      {/* <p>{product.description}</p> */}
      {/* <p>{product.price}</p> */}
      <button onClick={handleAddToCart}>Add to Cart</button>
      {cartItems.length > 0 && (
         <div>
          <h2>Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout</button>
          </div>
      )}
    </div>
    <Footer/>
    </div>
  );
}
export default ProductPage;