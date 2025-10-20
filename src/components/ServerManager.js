import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

function ServerForm({ onSubmit }) {
  const [formData, setFormData] = useState({ id: '', name: '', language: '', framework: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: '', name: '', language: '', framework: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            name="id"
            label="ID"
            value={formData.id}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="language"
            label="Language"
            value={formData.language}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            name="framework"
            label="Framework"
            value={formData.framework}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="outlined" color="secondary">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function ServerManager() {
  const [servers, setServers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commandOutput, setCommandOutput] = useState({});
  const [commandInputs, setCommandInputs] = useState({});

  const addServer = (server) => {
    setServers((prev) => [...prev, server]);
  };

  const deleteServer = (id) => {
    setServers((prev) => prev.filter((s) => s.id !== id));
    setCommandOutput((prev) => {
      const newOutput = { ...prev };
      delete newOutput[id];
      return newOutput;
    });
  };

  const runCommand = (id) => {
    const command = commandInputs[id];
    if (!command) return;

    // Simulated command output (replace with API call in real apps)
    const output = `Running "${command}" on server ${id}... Done.`;
    setCommandOutput((prev) => ({ ...prev, [id]: output }));
    setCommandInputs((prev) => ({ ...prev, [id]: '' }));
  };

  const handleCommandChange = (id, value) => {
    setCommandInputs((prev) => ({ ...prev, [id]: value }));
  };

  const filteredServers = servers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h5" gutterBottom>Server Manager</Typography>

      <ServerForm onSubmit={addServer} />

      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        style={{ marginBottom: '16px' }}
      />

      {filteredServers.map((server) => (
        <Paper key={server.id} style={{ padding: '16px', marginBottom: '12px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}><b>ID:</b> {server.id}</Grid>
            <Grid item xs={2}><b>Name:</b> {server.name}</Grid>
            <Grid item xs={2}><b>Language:</b> {server.language}</Grid>
            <Grid item xs={2}><b>Framework:</b> {server.framework}</Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteServer(server.id)}
              >
                Delete
              </Button>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Command"
                variant="outlined"
                size="small"
                fullWidth
                value={commandInputs[server.id] || ''}
                onChange={(e) => handleCommandChange(server.id, e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => runCommand(server.id)}
              >
                Run
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" style={{ color: 'gray' }}>
                Output: {commandOutput[server.id] || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default ServerManager;
