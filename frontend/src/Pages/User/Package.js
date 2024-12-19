import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography, Button, Box, Container } from "@mui/material";
// import "../../App.css"
import "./styles.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchComponent from "./Search";


const useStyles = makeStyles((theme) => ({
  image: {
    width: '600px',
    height: 'auto',
    // marginBottom: theme.spacing(2),
  },

  paperContainers: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '25px',
    padding: theme.spacing(3),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', // Add shadow effect
    maxWidth: '500px', // Limit maximum width
    height: '500px', // Set height
    marginTop: "40px",
    background:"rgba(240, 224, 218, 0.7)",
  },
}));


function Package() {
  const Navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [images, setImages] = useState([{}]);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [count ,setCount] = useState();

  const [packageData, setPackageData] = useState({
    package: "",
    details: [
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
    ],
  });
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleMembersChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    setCount(selectedCount);
  };
  

  
  const handleAddToCart = (image) => {
    if (!date || !count) {
      // Dates not selected, handle the error accordingly
      alert("Please select a date and members.");
      return;
    }
    let additionalCost = 0;
    if (count > 3) {
      const extraMembers = count - 3;
      additionalCost = extraMembers * 10;
    }
  
    const totalPrice = packageData.totalprice + additionalCost;
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image:image,
        _id: id,
        name: packageData.package,
        price: totalPrice,
        count: count,
        date: date.toLocaleDateString(),
       
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      Navigate("/")
    }
    
  };
  // <Box mt={4} sx={{ 
  //   display: 'flex', 
  //   justifyContent: 'flex-end',
  // }}>
  //   <form>
  //     <div>
  //       <label htmlFor="tripDate">Your trip date:</label>
  //       <br />
  //       <DatePicker
  //         id="tripDate"
  //         selected={date}
  //         onChange={handleDateChange}
  //         dateFormat="dd/MM/yyyy"
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="memberCount">Members:</label>
  //       <br />
  //       <input
  //         id="memberCount"
  //         type="number"
  //         value={count}
  //         onChange={handleMembersChange}
  //         min="1"
  //       />
  //       {count > 8 && (
  //         <span className="alert buttonfontfamily">
  //           More than 8 people? For every additional 5 people, we charge $5.
  //         </span>
  //       )}
  //     </div>
  //   </form>
  // </Box>
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


  useEffect(() => {
    async function fetchPackageData() {
      try {
        const response = await axios.get(`https://vacation-hut-0piq.onrender.com/package/${id}`);
        setPackageData(response.data);
        setImages(response.data.images);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPackageData(id);
  }, [id]);

  const classes = useStyles();

  

  return (
    <div className="App">
      <div className="packagenavbar">
      <ResponsiveAppBar />
      </div>
      
      <Container className="packagemargin">
        <div className="packageimage">
            {images.map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt={packageData.package}
              className="shadow-1-strong mb-4 imagegallery"
            />
          ))}
        </div>

          {/* <Typography variant="h4" component="h1" gutterBottom> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background:'#F0E0DA', borderRadius:'25px' }}>
              <h1 style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold', color:'#4E0D0D' }}>{packageData.package}</h1>
              <h1 style={{ marginLeft: '50px', fontFamily: 'Pacifico, cursive', fontWeight:'bold', color:'#4E0D0D' }}>${packageData.totalprice}</h1>
          </div>



       
      
     

        {/* <fieldset>
          {packageData.details.map((activity, index) => (
            <div key={index} className="activity-cost">
              <Typography variant="body1" className="activity">
                {activity.activity}
              </Typography>
              <Typography variant="body1" className="cost">
                {activity.cost}
              </Typography>
            </div>
          ))}
        </fieldset> */}
<div className="detailspackage" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
  <Box sx={{ py: 3, mt: '50px', width: '1150px',
      //  background: 'rgba(240, 224, 218)',
       backdropFilter: 'blur(10px)',
      //  boxShadow: '0 8px 32px 0 rgba(240, 224, 218, 0.7)',
       borderRadius: '25px',
       padding: '20px',
  }}>
    <Container maxWidth="lg">
    <div style={{ display: "flex", justifyContent: "space-between" }}>
  <fieldset style={{ marginRight: "20px" }}>
    <h2 style={{fontFamily: 'Pacifico, cursive', fontWeight:'bold', fontSize:"30px", color:'#4E0D0D'}}>Included  Activities</h2>
    {packageData.details.map((activity, index) => (
      <div key={index} className="activity-cost">
        <Typography variant="body1" className="activity" style={{fontFamily: 'Pacifico, cursive', fontWeight:'bold', fontSize:"20px"}}>
          {activity.activity}
        </Typography>
      </div>
    ))}
  </fieldset>

  <form style={{ width: "300px" }}>
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>
      <h3 htmlFor="tripDate" style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold' }}>Your trip date</h3>
      <DatePicker
        id="tripDate"
        selected={date}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        className="datefield no-border dateinput"
      />
    </div>
    <div>
      <h3 htmlFor="memberCount" style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold' }}>Members</h3>
      <input
        id="memberCount"
        type="number"
        value={count}
        onChange={handleMembersChange}
        min="3"
        className="datefield"
        style={{ border: "none", borderRadius:'5px', width:'200px' }}
      /><br/>
      {count > 3 && (
        <span className="alert buttonfontfamily" style={{color:'red'}}>
          Every additional 3 people you pay $10.
        </span>
      )}
    </div>
  </div>
</form>

</div>


        <p style={{ textAlign: 'center', fontFamily: 'Pacifico, cursive', fontWeight:'bold', fontSize:"25px", color:'#4E0D0D' }}>We can provide a tour guide to make your trip more memorable and enjoyable.</p>
      <Box mt={4} sx={{ 
        display: 'flex', 
        justifyContent: 'center',
      }}>

        




      </Box>
    </Container>
  </Box>
</div>



<div className="benefit--cards">
  <Paper className={classes.paperContainers}>
    <div className=" overlaycontainerss">
          <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Take a pictures</h2>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686167306/hd_camera_555-removebg-preview_rirnys.png" alt="Camera" className="iconss" />
          <p className='hdtext'>You are allowed to take photos for your memories, except inside the temples and museums. However, you can take photos in other areas.<br/>You are permitted to bring your own cameras and take photos.</p>
    </div>
  </Paper>
  
  <Paper className={classes.paperContainers}>
    <div className=" overlaycontainerss">
          <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Buy a memorable things</h2>
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686167622/hd_quality-removebg-preview_t9ynvz.png" alt="Memorable gifts" className="iconsss" />
          <p className='hdtext'>You have the opportunity to purchase memorable souvenirs at each location, allowing you to create cherished memories.<br/>You can purchase high-quality buy pottery items, handicrafts, and pure oils, among others.</p>
    </div>
  </Paper>
  </div>

  <div className="searchbargoogle">
    <SearchComponent/>
  </div>



  <div className="actbtn" style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Link to="/" style={{ textDecoration: 'none' }}>
      <Button variant="outlined" className="landbtn buttonfontfamily">
        Back to home
      </Button>
    </Link>

    
  <div>
  <Button
    variant="contained"
    className="landbtn buttonfontfamily"
    onClick={() =>
      handleAddToCart(
        images[0].url,
        packageData._id,
        packageData.package,
        packageData.totalprice,
        date
      )
    }
    style={{ marginRight: '10px' }}
  >
    Add to cart
  </Button>

  <Button
     variant="contained"
     className="landbtn buttonfontfamily"
     onClick={() =>
     handleBookNow(
     images[0].url,
     packageData._id,
     packageData.package,
     packageData.totalprice,
     date
     )
    }
    >
      Book now
    </Button>
  </div>
</div>



    <div className="imagegalleryaligns">
        <Grid container spacing={1} className="gridimage1">
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685702297/hd_gallery_1_jta0qv.jpg" alt="Beach side cooking" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Beach side cooking</h4>
                    <p>We can provide all the necessary ingredients for cooking. You can come and enjoy the experience. If you prefer, we can also provide a cook for your convenience.</p>
                    <h4>$ 42</h4>
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685702478/hd_gallery_2_uusfx8.jpg" alt="Anjaneyar temple" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Anjaneyar Kovil</h4>
                    <p>It is located in K.K.S road, Jaffna. Maruthanar Madam( Cunnakam) Anjanajar ( hanuman )statue is 72 feet high, you can visit here and experience a sense of devotion. You can enjoy the view of temple.</p>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685702718/hd_gallery_3_xepzba.jpg" alt="Crafttary shop" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Kopay Crafttary Shop</h4>
                    <p>Here, you can purchase various memorable items such as wooden crafts, including coffee cups, gift items, trophies, frames, key tags, name boards, flower vases, and more.</p>
                    <h4>$ 14</h4>
                    </div>
                  </div>
                  </Grid>
                  
            </Grid>



            <Grid container spacing={1} className="gridimage1">

                <Grid item xs={4}  >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685702879/hd_gallery_4_anbqit.jpg" alt="Oil making center" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Pure oil making center</h4>
                    <p>It is located in Aanaikottai, Jaffna. Here, you can witness the complete oil-making process and also purchase bottles of pure oil.</p>
                    <h4>$ 8</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685702988/hd_gallery_5_tqjp9z.jpg" alt="Sivapoomi museum" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                  <h4>Sivapoomi Museum</h4>
                  <p>It is situated in Naavatkuli, Jaffna. Here, an individual preserves and transforms old items into a museum, making it incredibly captivating and informative.</p>
                  <h4>$ 4</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703082/hd_gallery_6_nowhn2.jpg" alt="Sivapoomi Temple" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Sivapoomi temple</h4>
                    <p>The full Tiruvasakam is carved in 12 languages on granite walls and displayed around a hall which circles a Dakshinamurti shrine. Around are 108 perfectly carved Sivalingams and corresponding hanging bells. </p>
                    </div>
                  </div>
                  </Grid>
            </Grid>

            <Grid container spacing={1} className="gridimage1">

                <Grid item xs={4}  >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703478/hd_gallery_77_obwzga.jpg" alt="Nallur temple" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                   <h4>Nallur temple</h4>
                   <p>It is a highly revered temple dedicated to Lord Muruga. It attracts numerous tourists who come to witness the rich cultural heritage and architectural grandeur it offers.</p>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703353/hd_gallery_8_abqnpc.jpg" alt="Pottery making center" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Pottery making center</h4>
                    <p>You have the opportunity to create pottery items with your own hands. Moreover, you can purchase high-quality pottery items at an affordable price.</p>
                    <h4>$ 15</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703593/hd_gallery_9_zxtakl.jpg" alt="Jaffna fort" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Jaffna fort</h4>
                    <p>It is built by the Portuguese in the 17th century and later expanded by the Dutch, the fort stands as a testament to the colonial era and the region's strategic importance.</p>
                    </div>
                  </div>
                  </Grid>
            </Grid>

            <Grid container spacing={1} className="gridimage1">

                <Grid item xs={4}  >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703695/hd_image_10_on6emj.jpg" alt="K.K.S beach" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>K.K.S beach</h4>
                    <p>Kanakesanthurai Beach, located in Jaffna, is a renowned coastal destination that offers culinary delights. This popular beach, known for its picturesque surroundings, attracts a large number of tourists.</p>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685792795/hd_thinnai_spot_slkkmy.jpg" alt="Thinnai organic farm" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Thinnai organic farm</h4>
                    <p>It is the perfect place for you to relax. Pasumai superior room at this pioneering agritourism hotel is ideal for a secluded and calming farm stay.</p>
                    <h4>$ 10</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685703892/hd_gallery_12_y0sfca.jpg" alt="Casuarina Beach" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Casuarina Beach</h4>
                    <p>Casuarina Beach is in Karainagar, Jaffna District, Sri Lanka, about 20 kilometres (12 mi) from Jaffna. This is considered to be the best beach in the Jaffna Peninsula with white sand.</p>
                    </div>
                  </div>
                  </Grid>
            </Grid>

            <Grid container spacing={1} className="gridimage1">

                <Grid item xs={4}  >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685704411/hd_pizza_v10nzb.jpg" alt="food" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Foods</h4>
                    <p>We offer a variety of meals for our customers, including breakfast, lunch, and dinner. Our menu features delicious traditional dishes, prepared with care and offered at affordable prices.</p>
                    <h4>$ 23</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685704752/hd_transport_6_tkzepc.avif" alt="transport" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Transport</h4>
                    <p>We offer transportation services for our customers, providing a variety of options to suit their travel needs. Whether you prefer a car, van, or auto, we have a range of vehicles available for you to choose from.</p>
                    <h4>$ 26</h4>
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={4} >
                    <div class="packagecontainer">
                  <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685704879/hd_tour_guider_cktqye.jpg" alt="Tour guider" width="350" height="250" className="galleryimage"/>
                  <div class="packageoverlay">
                    <h4>Tour helper</h4>
                    <p>Our knowledgeable guides will help you discover hidden gems, share interesting insights, and make your journey truly memorable.</p>
                    <h4>$ 6</h4>
                    </div>
                  </div>
                  </Grid>
            </Grid>
            </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Package;
