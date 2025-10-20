import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { deleteServer } from '../services/serverService';

const DeleteServer = ({ serverId, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this server?')) {
      return;
    }
    setLoading(true);
    deleteServer(serverId)
      .then(() => {
        setLoading(false);
        if (onDeleted) onDeleted(serverId);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting server:', error);
        alert('Failed to delete server. Please try again.');
      });
  };

  return (
    <Button 
      variant="outlined" 
      color="error" 
      onClick={handleDelete} 
      disabled={loading}
      aria-label={`Delete server ${serverId}`}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
};

export default DeleteServer;
