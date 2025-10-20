import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { addServer } from '../services/serverService';

const AddServer = ({ onAdded }) => {
  const [server, setServer] = useState({
    id: '',
    name: '',
    language: '',
    framework: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServer((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!server.id.trim()) newErrors.id = 'ID is required';
    if (!server.name.trim()) newErrors.name = 'Name is required';
    // You can add more validation if needed
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    addServer(server)
      .then((response) => {
        setLoading(false);
        console.log('Server added successfully:', response);
        if (onAdded) onAdded(response); // Notify parent to update UI
        setServer({ id: '', name: '', language: '', framework: '' }); // Reset form
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error adding server:', error);
        alert('Failed to add server. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            label="ID"
            name="id"
            value={server.id}
            onChange={handleInputChange}
            error={Boolean(errors.id)}
            helperText={errors.id}
            fullWidth
            size="small"
            required
            inputProps={{ 'aria-required': true }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Name"
            name="name"
            value={server.name}
            onChange={handleInputChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            size="small"
            required
            inputProps={{ 'aria-required': true }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Language"
            name="language"
            value={server.language}
            onChange={handleInputChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Framework"
            name="framework"
            value={server.framework}
            onChange={handleInputChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Server'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddServer;
