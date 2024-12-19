import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import styles from "../../App.css";
import {
    faInstagram,
    faFacebookF,
    faWhatsapp,
  } from "@fortawesome/free-brands-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
  import { faBook } from "@fortawesome/free-solid-svg-icons";
  import { faUser } from "@fortawesome/free-solid-svg-icons";
  import { faBed } from "@fortawesome/free-solid-svg-icons";
  import { faBus } from "@fortawesome/free-solid-svg-icons";
  import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  import { faCopyright } from "@fortawesome/free-solid-svg-icons";

function Whychoose() {
  return (
<Grid container spacing={3} style={{ border: "none", marginTop: "20px" }}>
      <Grid item xs={6} style={{ maxWidth: "700px" }}>
        <Paper style={{ marginLeft: "280px", background: "none", boxShadow: "none" }}>
        <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1683836697/Ash_label_rwauga.png" alt="Why choose Vacation Hut" />
        </Paper>
      </Grid>
      <Grid item xs={6} style={{ maxWidth: "850px" }}>
        <Paper style={{textAlign: "left", marginLeft: "30px", background: "none", boxShadow: "none" }}>
        <p>
            We can provide valuable insights and recommendations for travelers
            looking to explore the area beyond the typical tourist hotspots.
          </p>
          <p>
            This website can help travelers connect more deeply with the local
            culture, have a more unique and memorable travel experience, and
            support sustainable tourism practices.
          </p>
          <p>
            This websites for tours often provide opportunities for cultural
            immersion, such as home-stays, cooking classes, or other hands-on
            experiences. This can lead to a deeper understanding and
            appreciation of the local culture.
          </p>
          <p>We can provide this facilities</p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="promo">Show the authentic experience places</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faUser} />
            <span className="promo">Guider facility</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faBus} />
            <span className="promo">Transport facility</span>
          </p>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Whychoose;
