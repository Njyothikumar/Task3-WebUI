import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from '@mui/material'; // removed Grid since unused

function ServerList({ servers, onDelete, commandInputs, commandOutputs, onCommandChange, onRunCommand }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Server list">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Language</strong></TableCell>
            <TableCell><strong>Framework</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
            <TableCell><strong>Command</strong></TableCell>
            <TableCell><strong>Run</strong></TableCell>
            <TableCell><strong>Output</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No servers found.
              </TableCell>
            </TableRow>
          )}
          {servers.map((server, idx) => (
            <TableRow key={server.id} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell>{server.id}</TableCell>
              <TableCell>{server.name}</TableCell>
              <TableCell>{server.language || '-'}</TableCell>
              <TableCell>{server.framework || '-'}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => onDelete(server.id)}>
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter command"
                  value={commandInputs[server.id] || ''}
                  onChange={(e) => onCommandChange(server.id, e.target.value)}
                  inputProps={{ 'aria-label': `Command input for server ${server.name}` }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onRunCommand(server.id)}
                  disabled={!commandInputs[server.id] || commandInputs[server.id].trim() === ''}
                >
                  Run
                </Button>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#555' }}
                  aria-live="polite"
                >
                  {commandOutputs[server.id] || 'N/A'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ServerList;  // <-- Make sure to export here!
