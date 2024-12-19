import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Validation from "../../Validation/checkoutvalidate";
import "../../App.css";
import "./Checkout.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FlagIcon from "@material-ui/icons/Flag";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import { Grid } from "@material-ui/core";
import { FormControl, InputLabel, TextField } from "@material-ui/core";
import Review from "./Review";
import submitReview from "./Review";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  input: {
    maxWidth: "200px", // Adjust the maximum width as needed
    width: "200px",
  },
  centeredText: {
    textAlign: "center",
  },
}));

const stripePromise = loadStripe(
  "pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
);

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();
  const [phonenumber, setPhonenumber] = useState("");
  const [country, setCountry] = useState("");
  const [nic, setNic] = useState("");
  const [passportno, setPassport] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [totalCost, setTotalCost] = useState(0);
  const { id } = useParams();
  const [error, setError] = useState({});

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce((total, item) => total + item.price, 0);
    setTotalCost(cost);
  }, []);
  const handleNumberchange = (value) => {
    setPhonenumber(value);
  };
  const handleCountrychange = (value) => {
    setCountry(value);
  };
  const handleToken = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(
      name,
      email,
      passportno,
      nic,
      phonenumber,
      country
    );
    setError(validationErrors);

    if (Object.values(validationErrors).every(value => value === '')){
      const cardElement = elements.getElement(CardElement);
      const { token, error: tokenError } = await stripe.createToken(
        cardElement
      );

      if (tokenError) {
        console.error("Error creating token:", tokenError);
        // Handle the error if needed
      }

      const response = await fetch("https://vacation-hut-0piq.onrender.com/dash/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total: totalCost,
          token: token.id,
          customerInfo: {
            name: name,
            email: email,
            phonenumber: phonenumber,
            country: country,
            passportno: passportno,
            nic: nic,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        const orderID = data.orderID;
        localStorage.removeItem("cart");
        setCartItems([]);
        setIsOpen(true);
        Navigate(`/receipt/${orderID}`);
      } else {
        alert("Payment failed");
      }
    }
  };

  const renderFields = () => {
    if (country === "LK") {
      return (
        <div>
          <label for="city" className="nicinputfield">
            <CardMembershipIcon /> NIC Number
          </label>
          <input
            type="text"
            value={nic}
            onChange={(e) => {
              setNic(e.target.value);
              setError((prevError) => ({ ...prevError, nic: '' }));
            }}
            className="inputfieldstyling"
          />
          {error.nic && <span className="text-danger"> {error.nic}</span>}
        </div>
      );
    } else {
      return (
        <div>
          <label for="city" className="passportinputfield">
            {" "}
            <CardMembershipIcon /> Passport Number
          </label>
          <input
            type="text"
            value={passportno}
            className="inputfieldstyling"
            onChange={(e) => {
              setPassport(e.target.value);
              setError((prevError) => ({ ...prevError, passportno: '' }));
            }}
          />
          {error.passportno && (
            <span className="text-danger"> {error.passportno}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="glass-input-containerreview alignformcenter">
      <form onSubmit={handleToken}>
        <div className="container row">
          <div className="col-md-6">
            <section>
              <div className="customer-detailscheckoutedit">
                <h2
                  className="customerheading"
                  style={{
                    fontFamily: "Pacifico, cursive",
                    color: "#4E0D0D",
                    fontWeight: "bold",
                  }}
                >
                  Customer details
                </h2>
                <label htmlFor="fname" className="firstfieldcheckoutform">
                  <PersonIcon />
                  Full Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  onChange={(e) => setName(e.target.value)}
                  className="inputfieldstyling"
                />
                {error.name && (
                  <span className="text-danger">{error.name}</span>
                )}

                <label htmlFor="email">
                  <EmailIcon />
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputfieldstyling"
                  
                />
                {error.email && (
                  <span className="text-danger">{error.email}</span>
                )}

                <label htmlFor="city">
                  <FlagIcon /> Country
                </label>
                <CountryDropdown
                  value={country}
                  onChange={(val) => handleCountrychange(val)}
                  className="countryinputfield inputfieldstyling"
                  valueType="short"
                  priorityOptions={["US", "GB", "CA", "LK"]}
                  key={country} // Optional: Set priority options
                />
                <br />

                {renderFields()}

                <label htmlFor="adr">
                  <PhoneIcon /> Phone Number
                </label>
                <PhoneInput
                  defaultCountry="LK" // Set the default country
                  value={phonenumber}
                  className="phonenumberinputfield"
                  style={{ maxWidth: "400px", width: "100%" }} // Set the desired width
                  onChange={handleNumberchange}
                  flags={false} // Disable country flags
                />
                <br />
                {error.phonenumber && (
                  <span className="text-danger">{error.phonenumber}</span>
                )}
              </div>
            </section>
          </div>
          <div className="col-md-6">
            <section>
              <div className="payment-detailscheckoutedit">
                <h2
                  className="customerheading"
                  style={{
                    fontFamily: "Pacifico, cursive",
                    color: "#4E0D0D",
                    fontWeight: "bold",
                  }}
                >
                  Payment details
                </h2>
                <label htmlFor="cname" className="firstfieldcheckoutform">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cname"
                  name="cardname"
                  className="inputfieldstyling"
                />

                <CardElement className={classes.cardElement} />
                <Review />
              </div>
            </section>
          </div>
          <div
            style={{
              textAlign: "center",
              gridColumn: "1 / span 2",
              fontSize: "17px",
            }}
          >
            <button
              type="submit"
              className="buttoninputfieldcheckoutedit landbtn checkoutformbutton inputfieldstyling"
            >
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const StripeCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
