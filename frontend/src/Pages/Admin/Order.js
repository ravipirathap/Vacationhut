import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import "../../App.css";
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    outline: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function Order() {
  const [orderdata, setorderData] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setorderid] = useState("");
 
  async function handleDelete(id) {
    try {
      await axios.delete(`https://vacation-hut-0piq.onrender.com/dash/order/${id}`);
      setorderData((prevOrderData) => prevOrderData.filter((order) => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(`https://vacation-hut-0piq.onrender.com/allorders`);
        const data = await response.json();
        setorderData(data.data);
      } catch (error) {
        console.error("Error retrieving receipt data:", error);
      }
    };

    fetchReceiptData();
  }, [orderdata]);

  const handleOpen = (email, _id) => {
    setorderid(_id);
    setEmail(email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://vacation-hut-0piq.onrender.com/sentstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          date,
          place,
          time,
        }),
      });

      const data = await response.json();

      if (data.success) {
        try {
          const response = await fetch(
            `https://vacation-hut-0piq.onrender.com/dash/orders/${orderId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "confirmed",
              }),
            }
          );
          const updatedData = await response.json();

          if (updatedData.success) {
            // Status successfully updated
            handleClose();
            // Handle success, e.g., show a success message
          } else {
            // Status update failed
            throw new Error(updatedData.message);
          }
        } catch (error) {
          console.error("Error updating status:", error);
          // Handle error updating status, e.g., show an error message
        }
      } else {
        // Request failed
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error sending receipt email:", error);
      // Handle error sending email, e.g., show an error message
    }
  };

  return (
    <div>
      <div className="sidebarDash">
        <img
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png"
          alt="Vacation Hut Logo"
          style={{ width: "250px", height: "150px" }}
        ></img>
        <div
          style={{
            paddingTop: "20px",
            fontSize: "25px",
            fontFamily: "Pacifico, cursive",
            fontWeight: "bold",
          }}
        >
          <a href="/dash/package">Packages</a>
          <a href="/dash/orders">Booking</a>
          <a href="/dash/users">Users</a>
        </div>
      </div>

      <div className="contentDash">
        <h1
          className="activity users"
          style={{
            fontFamily: "Pacifico, cursive",
            color: "#4E0D0D",
            fontWeight: "bold",
            fontSize: "45px",
          }}
        >
          Bookings
        </h1>
        {orderdata && orderdata.length > 0 && (
          <div style={{paddingTop:'40px'}}>
          <TableContainer component={Paper} style={{borderRadius:'25px', border: '2px solid #4E0D0D'}}>
            <Table>
              <TableHead style={{ background: "#F0E0DA", fontFamily: "Pacifico, cursive" }}>
                <TableRow style={{fontFamily: "Pacifico, cursive"}}>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Name</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Status</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Email</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Phone Number</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>N.I.C Number</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Passport Number</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Country</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Ordered Package</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Members</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Date</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Total Price</TableCell>
                  <TableCell style={{fontFamily: "Pacifico, cursive", fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderdata.map((item, index) => {
                  const { customer, _id, status, items, totalprice } = item;

                  const {
                    name,
                    email,
                    phonenumber,
                    nic,
                    passportno,
                    country,
                  } = customer;
                  return (
                    <TableRow key={_id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phonenumber}</TableCell>
                      <TableCell>{nic}</TableCell>
                      <TableCell>{passportno}</TableCell>
                      <TableCell>{country}</TableCell>

                      <TableCell>
                        {items.map((packageItem, index) => (
                          <div key={index}>{packageItem.packagename}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {items.map((packageItem, index) => (
                          <div key={index}>{packageItem.members}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {items.map((packageItem, index) => (
                          <div key={index}>{new Date(packageItem.date).toLocaleDateString()}</div>
                        ))}
                      </TableCell>
                      <TableCell>{totalprice}</TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <button className=" landbtn" onClick={() => handleOpen(email, _id)} style={{paddingRight:'10px',paddingLeft:'10px'}}>
                          Accept
                        </button>
                        <div style={{paddingTop:'10px'}}>
                        <button className="landbtn" onClick={() => handleDelete(_id)} style={{paddingRight:'10px',paddingLeft:'10px'}}>
                          
                       Delete
                     </button>
                     </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        )}
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
         
        >
          <div className={classes.modalContent}>
            <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                label="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
              <TextField
                label="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Order;
