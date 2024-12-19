import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";


function Pottery() {
  const { id } = useParams();
  const [images, setImages] = useState({});
  const [activity, setActivity] = useState([]);
  const [activityname, setActivityName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [food, setFood] = useState();
  const [accomadation, setAccomadation] = useState();
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchData(id)
      .then((data) => setActivity(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        _id: id,
        name: activityname,
        description: description,
        price: price,
        count: 1,
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));

      setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://vacation-hut-0piq.onrender.com/dash/activity/${id}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setData(json.data);
      setImages(json.data.images);
      setActivityName(json.data.activityname);
      setDescription(json.data.description);
      setFood(json.data.food);
      setAccomadation(json.data.accomadation);
      setPrice(json.data.price);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the fetchData function once, when the component is mounted
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <ResponsiveAppBar/>

      <div>
        <h1 className="acthead">{activityname}</h1>
        <img
          src={images.url}
          alt={activityname}
          className="actimg"
          height="500"
          width="800"
        />
        <p className="des">{description}</p>
      </div>
      <div className="subtext">
        <form>
          <label>
            Only visiting the pottery center{" "}
            <span className="time1"> 1 hrs </span>{" "}
            <span className="payment1"> US$6.00 </span>
            <input
              type="checkbox"
              name="option1"
              value="Option 1"
              className="box1"
            />
          </label>
          <br />
          <br />
          <label>
            Get your own experience <span className="time2"> 2.5 hrs </span>{" "}
            <span className="payment2"> US$12.00 </span>
            <input
              type="checkbox"
              name="option2"
              value="Option 2"
              className="box2"
            />
          </label>
          <br />
          <br />
          <label>
            Buy a memorable things <span className="payment3"> US$7.00 </span>
            <input
              type="checkbox"
              name="option3"
              value="Option 3"
              className="box3"
            />
          </label>
          <br />
          <br />
          <label>
            Guider facility <span className="time3">per day </span>{" "}
            <span className="payment4"> US$16.00 </span>
            <input
              type="checkbox"
              name="option4"
              value="Option 4"
              className="box5"
            />
          </label>
          <br />
          <br />
          <label>
            Food <span className="time4"> per meal</span>{" "}
            <span className="payment5">US$10.00</span>
            <input
              type="checkbox"
              name="option5"
              value="Option 5"
              className="box6"
            />
          </label>
          <br /> <br />
          <label>
            Accomadation <span className="time5">per day</span>{" "}
            <span className="payment6">US$40.00</span>
            <input
              type="checkbox"
              name="option5"
              value="Option 5"
              className="box7"
            />
          </label>
          <br /> <br />
          <h3>Mode of transport</h3>
          <label>
            Bicycle <span className="time6">per person</span>{" "}
            <span className="payment7">US$10.00</span>
            <input
              type="checkbox"
              name="option5"
              value="Option 5"
              className="box8"
            />
          </label>
          <br /> <br />
          <label>
            Motor bike <span className="time7">per person</span>{" "}
            <span className="payment8">US$16.00</span>
            <input
              type="checkbox"
              name="option1"
              value="Option 1"
              className="box9"
            />
          </label>
          <br />
          <br />
          <label>
            Auto <span className="time8">3 person</span>{" "}
            <span className="payment9">US$20.00</span>
            <input
              type="checkbox"
              name="option2"
              value="Option 2"
              className="box10"
            />
          </label>
          <br />
          <br />
          <label>
            Car <span className="time9">4 person</span>{" "}
            <span className="payment10">US$25.00</span>
            <input
              type="checkbox"
              name="option3"
              value="Option 3"
              className="box11"
            />
          </label>
          <br />
          <br />
          <label>
            Van <span className="time10">10 person</span>{" "}
            <span className="payment11">US$28.00</span>
            <input
              type="checkbox"
              name="option4"
              value="Option 4"
              className="box12"
            />
          </label>
          <br />
          <br />
        </form>
      </div>

      <div className="actbtn">
        <Link to="/">
          {" "}
          <button className="actbtn1">Back to home</button>
        </Link>

        <button className="actbtn2" onClick={handleAddToCart}>
          {" "}
          Add to book
        </button>
        <button className="actbtn3">Booking now</button>
      </div>
      <Footer/>
      
    </div>
  );
}

export default Pottery;
