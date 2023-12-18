import React, { useState } from 'react';
import { Typography, Button, Menu, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ChartComponent from "./ChartComponent";
import { FiArrowLeft } from 'react-icons/fi';
import { useAppContext } from "../context/appContext";
import LoadingComponent from "./LoadingComponent";

export const ChartView = ({ selectedCollection, collections, selectedUrl, handleGoBack }) => {
  const [currentView, setCurrentView] = useState('chart');
  const [anchorEl, setAnchorEl] = useState(null);

  const selectedCollectionData = collections.find((col) => col.collectionId === selectedCollection);
  const selectedUrlData = selectedCollectionData?.urls.find((url) => url.urlId === selectedUrl);

  const { chartData, statsLoading, getStats, logs } = useAppContext();

  if (!chartData || !logs) {
    if (!statsLoading) {
      getStats(selectedUrl);
    }
    return <LoadingComponent />;
  }

  const reversedChartData = [chartData[0], ...chartData.slice(1).reverse()];

  const handleViewChange = (event, view) => {
    setCurrentView(view);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="chart-view">
        <Typography variant="h5" gutterBottom>
          {`${selectedCollectionData?.collectionName || 'Unknown Collection'} - ${selectedUrlData?.shortName || 'Unknown URL'}`}
        </Typography>
        <div className="toggle-buttons">
          <ToggleButtonGroup
            value={currentView}
            exclusive
            onChange={handleViewChange}
            sx={{ borderRadius: '8px', overflow: 'hidden' }} 
          >
            <ToggleButton value="chart" sx={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px', borderRight: 'none' }}>
              Chart
            </ToggleButton>
            <ToggleButton value="logs" sx={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}>
              Logs
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {currentView === 'chart' && (
          <div className="chart-container">
            <ChartComponent data={reversedChartData} />
          </div>
        )}
        {currentView === 'logs' && (
          <div className="logs-container" sx={{ paddingBottom: '16px' }}> 
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Latest Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{log.views}</TableCell>
                    <TableCell>{log.latesttimestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="go-back" style={{ marginTop: '16px' }}> 
          <Button variant="outlined" color="primary" startIcon={<FiArrowLeft />} onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </>
  );
};