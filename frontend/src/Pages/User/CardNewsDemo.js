import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    width: 700,
    boxShadow: '5px 10px rgba(240, 224, 218)',
    borderRadius: 25
  },
  content: {
    padding: 24
  },
  // cta: {
  //   marginTop: 24,
  //   textTransform: "initial"
  // },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: '40px'
  },
}));

const CardNewsDemo = React.memo(function CardNews({ activeIndex = 0, image, packagename, price, id }) {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [date, setDate] = useState(null);
  const Navigate = useNavigate();
  const [count, setCount] = useState();

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

  const handleMembersChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    setCount(selectedCount);
  };


  const handleAddToCart = (image, id, activityname, totalprice) => {
    if (!date || !count) {
      alert("Please select a date and members.");
      return;
    }
    let additionalCost = 0;
    if (count > 3) {
      const extraMembers = count - 3;
      additionalCost = extraMembers  * 10;
    }
  
    const totalPrice =totalprice + additionalCost;
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image:image,
        _id: id,
        name: activityname,
        price: totalPrice,
        count: count,
        date: date.toLocaleDateString(),
       
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      // Navigate("/")
    }
    
  };

  const handleBookNow = (image, id, activityname, description, price) => {
    if (!date || !count) {
      alert("Please select a date and enter the number of members.");
      return;
    }
  
    try {
      handleAddToCart(image, id, activityname, description, price, date);
      Navigate("/cart");
    } catch (err) {
      throw err;
    }
  };
  


  return (
    <Card className={styles.root} style={{ borderRadius: "25px" }}>
      <CardMedia
        style={{
          height: "400px",
          width: "700px",
          filter: activeIndex !== 0 ? "blur(2px)" : "none",
          borderRadius: "25px",
        }}
        image={image}
      />

      {activeIndex === 0 && (
        <CardContent className={styles.content}>
          <div className="packagecarousel">
            <h1 style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold', color:'#4E0D0D' }}>{packagename}</h1>
            <h3 style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold', color:'#4E0D0D' }}>${price}</h3>
            <Grid container spacing={1}>
  <Grid item xs={6}>
    <div>
      <form>
        <div className="input-container">
          <label className="datelabelfield" style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold' }}>Date</label>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="datefield no-border dateinput"
            // style={{ borderRadius:'25px' }}
          />
        </div>
      </form>
    </div>
  </Grid>
  <Grid item xs={6}>
    <div className="input-container">
      <label className="datelabelfield" style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold' }}>Members</label> 
      <input
        type="number"
        value={count}
        onChange={(e) => handleMembersChange(e, count)}
        min="3"
        className="datefield dateinput"
        style={{ border: "none", borderRadius:'15px' }}
      />
      <br />
      {count > 3 && (
        <span className="alert buttonfontfamily" style={{color:'red'}}>
         Every additional 3 people you pay $10.
        </span>
      )}
    </div>
  </Grid>
</Grid>

            

            
            <div className={styles.buttonGroup}>
  <Button className="landbtn buttonfontfamily">
    <Link to={`/package/${id}`} style={{ color: "white", textDecoration: "none" }}>
      More details
    </Link>{" "}
    <ChevronRightRounded />
  </Button>

  <div>
    <Button
      variant="contained"
      color="primary"
      className="landbtn buttonfontfamily"
      style={{ marginRight: "10px" }} // Adjust the right margin for positioning
      onClick={() =>
        handleBookNow(image, id, packagename, price, date)
      }
    >
      Book Now
    </Button>


    <Button
      variant="contained"
      color="primary"
      className="landbtn buttonfontfamily"
      onClick={() =>
        handleAddToCart(image, id, packagename, price, date)
      }
    >
      Add to Cart
    </Button>
  </div>
</div>

          </div>
        </CardContent>
      )}
    </Card>
  );
});

export default CardNewsDemo;
