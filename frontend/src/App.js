import "./App.css";
import Login from "./Pages/User/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/User/Signup";
import Home from "./Pages/User/Home";
// import Dashboard from "./Pages/Admin/Dashboard";
import User from "./Pages/Admin/User";
import Order from "./Pages/Admin/Order";
import Addpackage from "./Pages/Admin/Addpackage";
import Cart from "./Pages/User/Cart"
import Updatepackage from "./Pages/Admin/Updatepackage";
import UserPackage from "./Pages/User/Package";
import AdminPackage from "./Pages/Admin/Package";
import Receipt from "./Pages/User/Recipt";
import Review from "./Pages/User/Review";
import MapComponent from "./Pages/User/Map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dash/users" element={<User />}></Route>
        <Route path="/dash/orders" element={<Order />}></Route>
        {/* <Route path="/dash" element={<Dashboard />}></Route> */}
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/dash/package/add" element = {<Addpackage/>}></Route>
        <Route path="/dash/package/update/:id" element = {<Updatepackage/>}></Route>
        <Route path="/package/:id" element = {<UserPackage/>}></Route>
        <Route path="/dash/package" element = {<AdminPackage/>}></Route>
        <Route path="/receipt/:id" element = {<Receipt/>}></Route>
        <Route path="/Review" element={<Review/>}></Route>
        <Route path="/map" element={<MapComponent/>}></Route>
        {/* <Route path="/ReviewCarosel" element={<ReviewCarousel/>}></Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
