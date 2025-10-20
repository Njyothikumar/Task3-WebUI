import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function ServerForm({ onSubmit }) {
  const [formData, setFormData] = useState({ id: '', name: '', language: '', framework: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) {
      alert('Please enter ID and Name');
      return;
    }
    onSubmit(formData);
    setFormData({ id: '', name: '', language: '', framework: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={3}>
          <TextField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            size="small"
            fullWidth
            required
            inputProps={{ 'aria-label': 'Server ID' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            size="small"
            fullWidth
            required
            inputProps={{ 'aria-label': 'Server Name' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            size="small"
            fullWidth
            inputProps={{ 'aria-label': 'Server Language' }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Framework"
            name="framework"
            value={formData.framework}
            onChange={handleInputChange}
            size="small"
            fullWidth
            inputProps={{ 'aria-label': 'Server Framework' }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button type="submit" variant="outlined" color="secondary" fullWidth>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ServerForm;