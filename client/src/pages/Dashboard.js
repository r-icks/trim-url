import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { FiUser, FiLogOut, FiLink2, FiPlus } from 'react-icons/fi';

import { useAppContext } from '../context/appContext';

import './Dashboard.css';
import LoadingComponent from '../components/LoadingComponent';
import { ChartView } from '../components/ChartView';
import { Urls } from '../components/Urls';
import { Collections } from '../components/Collections';

const Dashboard = () => {

  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const { user, userLoading, collections, getCollections, collectionsLoading, clearStats, logoutUser } = useAppContext();

  if (userLoading) return <LoadingComponent />;
  if (!user) {
    return <Navigate to="/" />;
  }

  if (!collections) {
    if (!collectionsLoading) {
      getCollections();
    }
    return <LoadingComponent />;
  }

  const handleUserMenuOpen = (event) => setUserAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserAnchorEl(null);
  const handleLogout = () => {
    logoutUser();
    handleUserMenuClose()
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
    setSelectedUrl(null);
  };

  const handleGoBack = () => {
    if (selectedUrl) {
      clearStats();
      setSelectedUrl(null);
    } else {
      setSelectedCollection(null);
    }
  };

  const handleViewStats = (url) => {
    setSelectedUrl(url);
  };

  return (
    <div className="dashboard-container">
      <AppBar position="static" className="app-bar">
        <Toolbar className="navbar-content">
          <div className="company-logo">
            <FiLink2 style={{ fontSize: 24, marginRight: 8, color: '#673ab7' }} />
            <span className="company-name">Trim URL</span>
          </div>
          <div className="navbar-right">
            <div className="user-menu">
              <Button
                className="user-button"
                variant="contained"
                color="primary"
                startIcon={<FiUser />}
                onClick={handleUserMenuOpen}
              >
                {user.name}
              </Button>
              <Menu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={handleUserMenuClose}
                className="user-menu-popup"
              >
                <MenuItem onClick={handleLogout}>
                  <FiLogOut style={{ marginRight: 8 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <div className="dashboard-content">
        <Card className="dashboard-card">
          <CardContent>
            {selectedUrl ? (
              // Third view - Chart view
              <ChartView collections={collections} selectedCollection={selectedCollection} selectedUrl={selectedUrl} handleGoBack={handleGoBack}/>
            ) : selectedCollection ? (
              // Second view - URLs view
              <Urls handleGoBack={handleGoBack} selectedCollection={selectedCollection} collections={collections} handleViewStats={handleViewStats}/>
            ) : (
              // First view - Collections view
              <Collections collections={collections} handleCollectionClick={handleCollectionClick} selectedCollection={selectedCollection}/>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
