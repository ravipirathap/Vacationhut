import React, { useState, useEffect } from "react";
import "../../Dash.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';


function Package() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const response = await axios.get("https://vacation-hut-0piq.onrender.com/allpackage");
      const data = response.data.data;
      setPackages(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://vacation-hut-0piq.onrender.com/dash/package/${id}`);
      setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="sidebarDash">
        <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{ width:'250px', height:'150px' }}></img>
        <div style={{ paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold' }}>
          {/* <a href="/dash">Dashboard</a> */}
          <a href="/dash/package">Packages</a>
          <a href="/dash/orders">Booking</a>
          <a href="/dash/users">Users</a>
        </div>
      </div>

      <div className="contentDash">
        <div style={{ textAlign:'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'55px', marginLeft: '20px' }}>Packages</h2>
            <Link className="landbtn" style={{ padding:'10px', marginRight: '20px' }} to="/dash/package/add">Add new package</Link>
          </div>

          <div style={{ paddingTop:'50px', paddingBottom:'20px' }}>
            <TableContainer component={Paper} style={{borderRadius:'25px', border: '2px solid #4E0D0D'}}>
              <Table>
                <TableHead style={{ background:'#F0E0DA' }}>
                  <TableRow>
                    <TableCell style={{ textAlign:'center' }}>
                      <Typography variant="h5" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'30px' }}>Package Image</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign:'center' }}>
                      <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'30px' }}>Package Name </Typography>
                    </TableCell>
                    <TableCell style={{ textAlign:'center' }}>
                      <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'30px' }}>Package Price</Typography>
                    </TableCell>
                    <TableCell style={{ textAlign:'center' }}>
                      <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'30px' }}>Action</Typography>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                   {packages.map((pkg) => (
                      <TableRow key={pkg._id}>
                        <TableCell><span style={{textAlign:'center'}}><img src={pkg.images[0].url} alt={pkg.package} className="packagepageimages"/></span>
                        </TableCell>
                        <TableCell ><h4 style={{ fontWeight: 'bold', textAlign:'center', fontSize:'25px' }}>{pkg.package}</h4></TableCell>
                        {/* <TableCell>{pkg.description}</TableCell> */}
                        <TableCell><h4 style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', textAlign:'center', fontSize:'25px' }}>${pkg.totalprice}</h4></TableCell>
                        <TableCell style={{textAlign:'center'}}>
                          <button className="landbtn" style={{paddingTop:'10px', paddingBottom:'10px', paddingRight:'20px', paddingLeft:'20px', marginRight: '10px'}} onClick={() => (window.location.href = `/dash/package/update/${pkg._id}`)}>Update</button>
                          <button className="landbtn" style={{paddingTop:'10px', paddingBottom:'10px', paddingRight:'20px', paddingLeft:'20px'}} onClick={() => handleDelete(pkg._id)}>Delete</button>
                        </TableCell>
                      </TableRow>
          ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Package;
