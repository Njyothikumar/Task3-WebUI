import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function ServerList({ servers, onDelete, onRunCommand }) {
  const [commandInputs, setCommandInputs] = useState({});

  const handleCommandChange = (id, value) => {
    setCommandInputs(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      {servers.length === 0 ? (
        <Typography variant="body1" role="alert" sx={{ mt: 2 }}>
          No servers to display.
        </Typography>
      ) : (
        servers.map(server => (
          <Paper key={server.id} sx={{ p: 2, mb: 2 }} elevation={3} aria-labelledby={`server-${server.id}-title`}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Typography id={`server-${server.id}-title`} variant="subtitle1" tabIndex={-1}>
                  <strong>ID:</strong> {server.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography><strong>Name:</strong> {server.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography><strong>Language:</strong> {server.language || '-'}</Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography><strong>Framework:</strong> {server.framework || '-'}</Typography>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(server.id)}
                  aria-label={`Delete server ${server.name}`}
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  label={`Command for ${server.name}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={commandInputs[server.id] || ''}
                  onChange={(e) => handleCommandChange(server.id, e.target.value)}
                  aria-describedby={`command-output-${server.id}`}
                  inputProps={{
                    'aria-label': `Command input for server ${server.name}`,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (commandInputs[server.id]?.trim()) {
                      onRunCommand(server.id, commandInputs[server.id].trim());
                      handleCommandChange(server.id, '');
                    }
                  }}
                  disabled={!commandInputs[server.id] || !commandInputs[server.id].trim()}
                  aria-label={`Run command on server ${server.name}`}
                  fullWidth
                >
                  Run
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  id={`command-output-${server.id}`}
                  variant="body2"
                  sx={{ color: 'gray', fontStyle: 'italic', mt: 1 }}
                  aria-live="polite"
                >
                  Output: {server.commandOutput || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </div>
  );
}

export default ServerList;
