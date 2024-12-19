import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Packagedetails = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartcount, setCartCount] = useState(0); // Initialize cart count to zero
  const [date, setDate] = useState(null);
  const Navigate = useNavigate();

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
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleAddToCart = (image, id, activityname, totalprice) => {
    if (!date) {
      // Dates not selected, handle the error accordingly
      alert("Please select check-in and check-out dates.");
      return;
    }
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image: image,
        _id: id,
        name: activityname,
        price: totalprice,
        count: 1,
        date: date.toLocaleDateString(),
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));

      setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
    }
  };

  const handleBookNow = (image, id, activityname, description, price, date) => {
    handleAddToCart(image, id, activityname, description, price, date);
    Navigate("/cart");
  };
  return (
    <div>
      {images.map((image, index) => {
        const activity = data[index];
        return (
          <div key={index} className="activity-card">
            <Grid container spacing={5}>
              <Grid item xs={12} md={5}>
                <Link to={`/package/${activity._id}`}>
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="activity-image"
                  />
                </Link>
              </Grid>
              <Grid item xs={12} md={2}>
                <div className="activity-details">
                  <h4>{activity.package}</h4>
                  <span>{activity.totalprice}</span>
                  <div>
                    <div>
                      <h2>Calendar</h2>
                      <form>
                        <div>
                          <label>Date:</label>
                          <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      </form>
                    </div>

                    <button
                      className="booksbtn booksbtn1"
                      onClick={() =>
                        handleBookNow(
                          image,
                          activity._id,
                          activity.package,
                          activity.totalprice,
                          date
                        )
                      }
                    >
                      book now
                    </button>

                    <button
                      className="booksbtn booksbtn1"
                      onClick={() =>
                        handleAddToCart(
                          image,
                          activity._id,
                          activity.package,
                          activity.totalprice,
                          date
                        )
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default Packagedetails;
