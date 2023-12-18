import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        background: 'white',
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        style={{ color: '#8e2de2' }}
      />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Loading...
      </Typography>
    </div>
  );
};

export default LoadingComponent;
