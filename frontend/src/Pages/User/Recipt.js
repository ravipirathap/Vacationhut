import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import "./styles.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';

  

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.brown,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Receipt = () => {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(`https://vacation-hut-0piq.onrender.com/dash/orders/${id}`);
        const data = await response.json();

        setReceiptData(data);
        setCustomer(data.customer);
        setItems(data.items);
      } catch (error) {
        console.error('Error retrieving receipt data:', error);
      }
    };

    fetchReceiptData();
  }, [id]);

  if (!receiptData) {
    return <div>Loading receipt...</div>;
  }

  const sendMail = async () => {
    try {
      const response = await fetch('https://vacation-hut-0piq.onrender.com/sentreceipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerInfo: customer,
          orderID: id,
          total: receiptData.totalprice,
        }),
      });
      const data = await response.json();
      if (data.success) {
        Navigate("/");
      }
      // Handle the response from the backend, e.g., display a success message
    } catch (error) {
      console.error('Error sending receipt email:', error);
    }
  };

  return (
<div>
       <div id="mySidenav" class="sidenav sidebarDash">
         <h1 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', textAlign:'center', background:'#4e0d0d', color:'white', padding:'20px' }}>Receipt</h1>
         <div className='containerreceiptedittinganimation'>
         <h2 style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', paddingTop:'35px', paddingLeft:'20px', textAlign:'left', fontSize:'25px'}} className="titleanimation"><span class="title-word title-word-1" style={{fontSize:'50px'}}>V</span><span class="title-word title-word-2">isit</span><br/> <span class="title-word title-word-3" style={{fontSize:'50px'}}>A</span><span class="title-word title-word-4">dventure</span><br/><span class="title-word title-word-1" style={{fontSize:'50px'}}>C</span><span class="title-word title-word-2">amping</span><br/><span class="title-word title-word-3" style={{fontSize:'50px'}}>A</span><span class="title-word title-word-4">ttractions</span><br/><span class="title-word title-word-1" style={{fontSize:'50px'}}>T</span><span class="title-word title-word-2">ourism</span><br/><span class="title-word title-word-3" style={{fontSize:'50px'}}>I</span><span class="title-word title-word-4">tinerary</span><br/><span class="title-word title-word-1" style={{fontSize:'50px'}}>O</span><span class="title-word title-word-2">uting</span><br/><span class="title-word title-word-3" style={{fontSize:'50px'}}>N</span><span class="title-word title-word-4">omad</span></h2>
         </div>
         <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" style={{width:'230px', paddingTop:'35px'}}></img>
       </div>

<div style={{ paddingTop: '30px' }} className="contentDash">
        <div className="customer-details">
        <div style={{ 
    margin: 'auto',
    maxWidth: '600px',
    padding: '20px',
    background: '#F0E0DA',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '25px',
  }}>
        <h1 style={{ fontFamily: 'Pacifico, cursive', fontSize: '55px', fontWeight: 'bold', color: '#4E0D0D', marginTop: '50px' }}>Customer Details</h1>
        <p style={{ marginTop: '40px' }}>Name: {customer.name}</p>
        <p style={{ marginTop: '30px' }}>Email: {customer.email}</p>
        <p style={{ marginTop: '30px' }}>Phone Number: {customer.phonenumber}</p>
        <p style={{ marginTop: '30px' }}>Country: {customer.country}</p>
        <p style={{ marginTop: '30px', marginBottom: '0' }}>{customer.passportno ? `Passport Number: ${customer.passportno}` : `NIC: ${customer.nic}`}</p>  
        </div>



      <div style={{ 
         margin: 'auto',
         maxWidth: '600px',
         padding: '20px',
         background: '#F0E0DA',
         boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
         borderRadius: '25px',
        }}>           
        <h1 style={{ fontFamily: 'Pacifico, cursive', fontSize: '55px', fontWeight: 'bold', color: '#4E0D0D', marginTop: '50px' }}>Booking Details</h1>
                       {items.map((item, index) => (
       <div key={index}>
        <div>
        <p style={{ marginTop: '40px' }}>Package Name: {item.package.package}</p>
        <p style={{ marginTop: '30px' }}>Package Price: ${item.package.totalprice}</p>
        <p style={{ marginTop: '30px' }}>Date: {new Date(item.date).toLocaleDateString()}</p>
        </div>
        <div>
        <p style={{ marginTop: '30px' }}>Total Price: ${receiptData.totalprice}</p>
        </div>
        </div>
        
        ))}
          </div>


        </div>
        <div style={{textAlign:'right'}}>
        <button onClick={sendMail} style={{marginTop:'40px', padding:'5px'}} className="landbtn">Send me receipt</button>
        </div>




        <div className="card" style={{ marginTop: '190px', textAlign: 'center', background: '#F0E0DA', borderRadius:'25px' }}>
      <h2
        className="titleanimation"
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: 'bold',
          paddingTop: '30px',
          paddingLeft: '20px',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <span class="title-word title-word-1">Adventure</span>
        <span class="title-word title-word-2"> awaits</span>
        <span class="title-word title-word-3"> you... </span>
        <span class="title-word title-word-4">let</span>
        <span class="title-word title-word-1"> us</span>
        <span class="title-word title-word-2"> take</span>
        <span class="title-word title-word-3"> you</span>
        <span class="title-word title-word-4"> there.</span>
      </h2>
      <h3
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: 'bold',
          color: '#4E0D0D',
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        +94 76 123 8954
      </h3>
      <h3
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: 'bold',
          color: '#4E0D0D',
          textAlign: 'center',
          paddingBottom: '30px',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        vacationapk@gmail.com
      </h3>
    </div>

        
      
      </div>
    </div>
  );
};

export default Receipt;
