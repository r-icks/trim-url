import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import { FiAlertCircle } from 'react-icons/fi';

import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Container component="main" maxWidth="sm" className="content">
        <FiAlertCircle className="icon" />
        <Typography variant="h5" align="center" gutterBottom>
          Oops! 404 Not Found
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          The page you are looking for might be under construction or does not exist.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
