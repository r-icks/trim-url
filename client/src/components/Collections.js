import { Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAppContext } from "../context/appContext";
import Alert from "./Alert";

export const Collections = ({ collections, handleCollectionClick }) => {
  const [newCollection, setNewCollection] = useState('');
  const { addCollection } = useAppContext();
  
  const handleAddCollection = () => {
    addCollection(newCollection);
    setNewCollection('');
  }

  return (
    <div className="collections-view">
      <Alert />
      <Typography variant="h5" gutterBottom>
        Collections
      </Typography>
      <div className="collections-list">
        {collections.map((collection) => (
          <Button
            key={collection.collectionId}
            className={`collection-item`}
            onClick={() => handleCollectionClick(collection.collectionId)}
            variant="contained"
            color="primary"
            fullWidth
            style={{ textTransform: 'none' }}
          >
            {collection.collectionName}
          </Button>
        ))}
      </div>
      <div className="add-collection">
        <TextField
          label="New Collection"
          variant="outlined"
          size="small"
          value={newCollection}
          onChange={(e) => setNewCollection(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FiPlus />}
          onClick={handleAddCollection}
          style={{ marginLeft: 8 }}
        >
          Add Collection
        </Button>
      </div>
    </div>
  );
};
