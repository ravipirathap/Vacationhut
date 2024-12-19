// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation} from "react-router-dom";
// import {
//   useStripe,
//   useElements,
//   CardElement,
//   Elements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { makeStyles } from "@material-ui/core/styles";
// import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';


// const useStyles = makeStyles({
//   cardElement: {
//     width: "500px",
//   },
// });
// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const stripe = useStripe();
//   const elements = useElements();
//   const classes = useStyles();
//   const [name,setName] = useState()
//   const [email,setEmail] = useState()
//   const [phonenumber,setPhonenumber] = useState()
//   const [country,setCountry] = useState()
//   const [nic,setNic] = useState()
//   const [passportno,setPassport] = useState()



//   useEffect(() => {
//     const cart = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : [];
//     setCartItems(cart);
//     const cost = cart.reduce(
//       (total, item) => total + item.price * item.count,
//       0
//     );
//     setTotalCost(cost);
    
//   }, []);

//   const handleRemoveItem = (item) => {
//     const updatedCart = cartItems.filter(
//       (cartItem) => cartItem._id !== item._id
//     );
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };
// // console.log(cartItems[0])
//   const location = useLocation();
//   const handleToken = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet
//       return;
//     }
  
//     const cardElement = elements.getElement(CardElement);
//     const { token, error } = await stripe.createToken(cardElement);
//     if (error) {
//       console.error("Error creating token:", error);
//     } else {
//     const response = await fetch("http://localhost:5000/dash/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         items: cartItems[0],
//         token: token,
//         customerInfo: {
//           name:name,
//           email:email,
//           phonenumber:phonenumber,
//           country:country,
//           passportno:passportno,
//           nic:nic

//         },
//       }),
//     });
  
//     const data = await response.json();
    
//     if (data.success) {
//       localStorage.removeItem("cart");
//       setCartItems([]);
//       setIsOpen(true);
//     } else {
//       alert("Payment failed");
//     }
//   };}

//   const searchParams = new URLSearchParams(location.search);
//   const itemsParam = searchParams.get("items");

//   if (itemsParam) {
//     try {
//      const cartItems = JSON.parse(itemsParam);
//     } catch (error) {
//       console.error("Error parsing cart items JSON:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>Cart</h1>
//       <Table>
//   <TableHead>
//     <TableRow>
//       <TableCell>Image</TableCell>
//       <TableCell>Package Name</TableCell>
//       <TableCell>Price</TableCell>
//       <TableCell>Remove</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {/* Mapping over the cartItems and rendering table rows */}
//     {cartItems.map((item) => (
//       <TableRow key={item._id}>
//         <TableCell>
//           <img
//             src={item.image}
//             alt={item.package}
//             className="shadow-1-strong mb-4 "  width={100} height={100}
//           />
//         </TableCell>
//         <TableCell>{item.name}</TableCell>
//         <TableCell>{item.price}</TableCell>
//         <TableCell>
//           <button onClick={() => handleRemoveItem(item)}>Remove</button>
//         </TableCell>
//       </TableRow>
//     ))}
//   </TableBody>
// </Table>

// <h3>Total: ${totalCost}</h3>


//       <form onSubmit={handleToken} >
//   <label>
//     Name:
//     <input type="text" name="name" onChange={(e) => {
//                 setName(e.target.value);
//               }} />
//   </label>{" "}
//   <br />
//   <label>
//     Email:
//     <input type="email" name="email" required  onChange={(e) => {
//                 setEmail(e.target.value);
//               }}/>
//   </label>{" "}
//   <br />
//   <label>
//     Phone Number:
//     <input type="number" name="phone number"  onChange={(e) => {
//                 setPhonenumber(e.target.value);
//               }} />
//   </label>{" "}
//   <br />
//   <label>
//     Country:
//     <input type="country" name="country" required onChange={(e) => {
//                 setCountry(e.target.value);
//               }} />
//   </label>{" "}
//   <br /><label>
//     Nic Number:
//     <input type="number" name="nic" required  onChange={(e) => {
//                 setNic(e.target.value);
//               }}/>
//   </label>{" "}
//   <br />
//   <label>
//     Passport Number:
//     <input type="text" name="Passport" required  onChange={(e) => {
//                 setPassport(e.target.value);
//               }}/>
//   </label>{" "}
//   <br />
//   <div >
//     <label>
//       Card details:
//       <CardElement
      
//       className={classes.cardElement}
//     />
//     </label>{" "}
//   </div>
//   <br />
//   <button type="submit"  disabled={!stripe}>
//     Pay ${totalCost}
//   </button>
// </form>
//     </div>
//   );
// };

// const stripePromise = loadStripe(
//   "pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
// );

// const Checkout = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Cart/>
//       </div>
//     </Elements>
//   );
// };

// export default Checkout;
