import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

import './RegisterLogin.css';
import Alert from '../components/Alert';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const RegisterLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, setupUser } = useAppContext();

  const toggleView = () => {
    setValues((prevValues) => ({
      ...prevValues,
      isMember: !prevValues.isMember,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
      })
    }
    else {
      setupUser({
        currentUser,
        endPoint: "register",
      })
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [user, navigate]);

  const { isMember } = values;

  return (
    <div className="register-login-container">
    <Alert />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="paper-container">
          <FiLink className="logo-icon" />
          <Typography variant="h5" align="center" gutterBottom>
            Trim URL
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {isMember ? 'Log in to your account' : 'Create a new account'}
          </Typography>
          <form onSubmit={handleSubmit}>
            {!isMember && (
              <TextField
                label="Name"
                type="text"
                fullWidth
                margin="normal"
                required
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            )}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className="submit-button"
              disabled = {isLoading}
            >
              {isMember ? 'Login' : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" align="center" className="toggle-text">
            {isMember
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link to="#" onClick={toggleView}>
              {isMember ? 'Register' : 'Login'}
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterLogin;