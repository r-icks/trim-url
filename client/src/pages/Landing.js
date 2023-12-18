import React from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import ChartComponent from '../components/ChartComponent';

import './Landing.css';

const Landing = () => {
  const chartData = [
    ['Day', 'Visits'],
    ['Mon', 50],
    ['Tue', 80],
    ['Wed', 30],
    ['Thu', 120],
    ['Fri', 90],
    ['Sat', 60],
    ['Sun', 40],
  ];

  return (
    <div className="landing-container">
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} className="paper-container">
          <FiLink className="logo-icon" />
          <Typography variant="h5" align="center" gutterBottom>
            Trim URL
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Shorten your URLs with Trim URL and track their performance.
          </Typography>
          <div className="features-container">
            <Typography variant="subtitle1" align="center" gutterBottom>
              Features:
            </Typography>
            <ul>
              <li>Shorten URLs with ease</li>
              <li>Track statistics for each URL</li>
              <li>Organize URLs into collections</li>
            </ul>
          </div>
          <div className="chart-container">
            <ChartComponent data={chartData} />
          </div>
          <div className="auth-buttons">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register"
            >
              Sign Up
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Landing;