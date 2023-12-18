import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { TiTick } from 'react-icons/ti';
import { IoIosAlert } from 'react-icons/io';
import { useAppContext } from '../context/appContext';

const Alert = () => {
  const { alertText, alertType, showAlert } = useAppContext();

  const getIconAndColor = () => {
    switch (alertType) {
      case 'success':
        return { icon: <TiTick />, color: '#4CAF50' }; 
      case 'danger':
        return { icon: <IoIosAlert />, color: '#FF5733' }; 
      default:
        return { icon: null, color: '#2196F3' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      {showAlert && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: color,
            p: 2,
            m: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            color="inherit"
            size="small"
            sx={{ marginRight: 1 }}
            disabled
          >
            {icon}
          </IconButton>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {alertText}
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default Alert;