import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {  Paper, Typography} from '@material-ui/core';


const FormContainer = styled(Grid)({
  padding: '20px',
  margin: '0 auto',
  maxWidth: '600px',
});

const ActivityInput = styled(TextField)({
  marginBottom: '10px',
});


function Addpackage() {
  const rows = [...Array(10)]; // Array of 10 rows

  async function postPackage(event) {
    event.preventDefault();
   const Navigate = useNavigate
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const packageData = {};
    const userId = localStorage.getItem("userId");
    // Extract the package name from the form data
    packageData.package = formData.get("package");
    packageData.description = formData.get("description");
    packageData.totalprice = formData.get("total")
    packageData.id = userId; // Replace `userId` with the actual user ID value
    // Extract the details data from the form data
    packageData.details = [];
    const activities = formData.getAll("activity[]");
    const costs = formData.getAll("cost[]");
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      const cost = parseInt(costs[i]);
      if (activity && cost) {
        packageData.details.push({
          activity,
          cost,
        });
      }
    }
    const images = document.querySelector("#images").files;
    const imageUrls = [];
    const publicIds = [];
    for (const image of images) {
      const { public_id, url } = await uploadImage(image);
      publicIds.push(public_id);
      imageUrls.push(url);
    }
    async function uploadImage(file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://vacation-hut-0piq.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }
    packageData.images = imageUrls.map((url, i) => ({
      url,
      public_id: publicIds[i],
    }));
    const token = localStorage.getItem("token"); // Get the token from local storage
    console.log(packageData)
try {
  const response = await fetch("https://vacation-hut-0piq.onrender.com/packages", {
    method: "POST",
    body: JSON.stringify(packageData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Include the token in the headers
    },
  });
  alert(" saved package!");
  window.location.href = "/dash/package";
} catch (err) {
  console.error(err);
  alert("Error saving package!");
}
  }
  function handleImageChange(event) {
    const input = event.target;
    if (input.files && input.files.length) {
      const previewContainer = document.querySelector("#image-preview");
      previewContainer.innerHTML = ""; // Clear existing previews
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = function () {
          const preview = document.createElement("img");
          preview.src = reader.result;
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    }
  }
 
  return (
    <div>
      <div className="sidebarDash">
        <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{width:'250px', height:'150px'}}></img>
          <div style={{paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold'}}>
            <a href="/dash/package">Packages</a>
            <a href="/dash/orders">Booking</a>
            <a href="/dash/users">Users</a>
          </div>
      </div>
      
      <div className="contentDash">
      <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px', textAlign:'center'}}>Add new package</h2>
       <div>
       <form>
       <section style={{ display: 'flex', padding: '20px', borderRadius: '25px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)',  margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', fontSize: '25px' }}>Package Name</Typography>
            <TextField variant="outlined" name="package" style={{ background: '#F0E0DA', marginBottom: '20px' }} />
            <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', fontSize: '25px' }}>Description</Typography>
            <TextField variant="outlined" name="description" style={{ background: '#F0E0DA', marginBottom: '20px' }} />
            <Typography variant="h6" style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', fontSize: '25px' }}>Total Price</Typography>
            <TextField variant="outlined" type="number" name="total" style={{ background: '#F0E0DA' }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <section>
            <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686399343/hd_dash_package-removebg-preview_zlnizb.png" style={{width:'300px', height:'300px'}}></img>
          </section>
        </Grid>
      </Grid>
    </section>
           <section style={{padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    
    margin: '20px',
    }}>
           <fieldset>
             <legend style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'35px', textAlign:'center'}}>Details</legend>
            
              <Grid container spacing={2}>
      {rows.map((_, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius:'25px', textAlign:'center' }}>
            <Grid container spacing={2} style={{borderRadius:'25px'}}>
              
                <Typography variant="h6" gutterBottom style={{fontFamily: 'Pacifico, cursive', fontWeight:'bold', fontSize:'25px', textAlign:'center',}}>
                  Activity 
                </Typography>
                <TextField variant="outlined" fullWidth style={{borderRadius:'25px'}} />
             
             
                <Typography variant="h6" gutterBottom style={{fontFamily: 'Pacifico, cursive', fontWeight:'bold', fontSize:'25px'}}>
                  Cost
                </Typography>
                <TextField variant="outlined" fullWidth />
            
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
           </fieldset>
           </section>
           
            <label htmlFor="images">Select Images</label>
            <input type="file" id="images" name="images" accept="image/*" multiple onChange={handleImageChange}/>
            <div id="image-preview"></div>
          <div style={{paddingTop:'40px', textAlign:'center', paddingBottom:'20px'}}>
           <button type="submit" onClick={postPackage} className="landbtn" style={{paddingTop:'2px', paddingRight:'30px', paddingLeft:'30px',paddingBottom:'2px'}}>
             Save
           </button>
           </div>
         </form>

       </div>
      </div>



    </div>
  );
}
export default Addpackage;