import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { FiArrowLeft, FiCopy, FiBarChart, FiPlus } from "react-icons/fi";
import { useAppContext } from '../context/appContext';
import Alert from './Alert';

export const Urls = ({ handleGoBack, selectedCollection, collections, handleViewStats }) => {
  const { addUrl } = useAppContext();
  const [newUrlShort, setNewUrlShort] = useState('');
  const [newUrlRedirect, setNewUrlRedirect] = useState('');
  const [selectedCollectionData, setSelectedCollectionData] = useState(null);

  useEffect(() => {
    const updatedSelectedCollection = collections.find((col) => col.collectionId === selectedCollection);
    setSelectedCollectionData(updatedSelectedCollection);
  }, [collections, selectedCollection]);

  const handleAddUrl = () => {
    addUrl({ collectionId: selectedCollection, shortName: newUrlShort, redirectUrl: newUrlRedirect });
    setNewUrlShort('');
    setNewUrlRedirect('');
  };

  const truncateUrl = (url) => {
    if (url.length > 15) {
      return `${url.substring(0, 15)}...`;
    }
    return url;
  };

  const handleCopyToClipboard = (shortUrl) => {
    const tempInput = document.createElement('input');
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  return (
    <>
      <Alert />
      <div className="urls-view">
        <div className="go-back">
          <Button variant="outlined" color="primary" startIcon={<FiArrowLeft />} onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
        <Typography variant="h5" gutterBottom>
          {selectedCollectionData ? selectedCollectionData.collectionName : 'Unknown Collection'} URLs
        </Typography>
        {selectedCollectionData?.urls.length ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Redirect URL</TableCell>
                  <TableCell align="center">Copy</TableCell>
                  <TableCell align="center">Stats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCollectionData.urls.map((url) => (
                  <TableRow key={url.urlId}>
                    <TableCell>{url.shortName}</TableCell>
                    <TableCell>
                      <div className="truncated-url" title={url.redirectUrl}>
                        {truncateUrl(url.redirectUrl)}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="action-buttons">
                        <Typography variant="body2">Copy</Typography>
                        <IconButton onClick={() => handleCopyToClipboard(`localhost:3000/r/${selectedCollectionData.collectionName}/${url.shortName}`)}>
                          <FiCopy />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="action-buttons">
                        <Typography variant="body2">Stats</Typography>
                        <IconButton onClick={() => handleViewStats(url.urlId)}>
                          <FiBarChart />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            No URLs available in this collection. Add a new URL to this collection.
          </Typography>
        )}
        <div className="add-url">
          <TextField
            label="Short Name"
            variant="outlined"
            size="small"
            value={newUrlShort}
            onChange={(e) => setNewUrlShort(e.target.value)}
          />
          <TextField
            label="Redirect Link"
            variant="outlined"
            size="small"
            value={newUrlRedirect}
            onChange={(e) => setNewUrlRedirect(e.target.value)}
            style={{ marginLeft: 8 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            onClick={handleAddUrl}
            style={{ marginLeft: 8 }}
          >
            Add URL
          </Button>
        </div>
      </div>
    </>
  );
};