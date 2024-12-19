import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { Email } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import { Phone } from '@mui/icons-material';

import "./styles.css";

function Footer() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right,#ffffff, #ECDACD,  #E6C4AC)',
        color: 'black',
        py: 3,
        mt: '50px',
        fontFamily: 'Fira Sans, sans-serif',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 2, sm: 0 } }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <img
                src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png"
                alt="Company Logo"
                style={{ width: 'auto', height: '100px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 2, sm: 0 } }}>
            {/* Home, Packages, Booking */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography component="h2" sx={{ mb: 2 }} className="footerfontfamily">
                Home <br />
                Packages <br />
                Booking <br />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 2, sm: 0 } }}>
            {/* Contact Us */}
            <Typography component="h2" sx={{ mb: 2 }} className="footerfontfamily">
              Contact Us
            </Typography>
            <Typography variant="body2" className="footerfontfamily">
              <span><Phone /></span> <span style={{ fontWeight: 'bold' }}>076 1238954</span><br /><br/>
              <Email/> <span style={{ fontWeight: 'bold' }}>vacationapk@gmail.com</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 2, sm: 0 } }}>
            {/* Follow Us */}
            <Typography component="h2" sx={{ mb: 2, textAlign: 'center' }} className="footerfontfamily">
              Follow Us
            </Typography>
            <Grid container justifyContent="center">
              <Grid item>
                <WhatsApp fontSize="large" color="white" />
              </Grid>
              <Grid item>
                <Instagram fontSize="large" color="white" />
              </Grid>
              <Grid item>
                <Email fontSize="large" color="white" />
              </Grid>
              <Grid item>
                <Facebook fontSize="large" color="white" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }} className="copyrightgridsection">
            {/* Copyright */}
            <Typography variant="body2" align="center" style={{ fontWeight: 'bold' }}>
              © {new Date().getFullYear()} <span style={{ color:'#ff3e00' }}>Vacation</span> <span style={{ color:'#5e4f47' }}>Hut.</span> All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
