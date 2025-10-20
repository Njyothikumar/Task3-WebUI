import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header';
import ServerForm from './components/ServerForm';
import ServerList from './components/ServerList';

function App() {
  const [servers, setServers] = useState([]);
  const [commandInputs, setCommandInputs] = useState({});
  const [commandOutputs, setCommandOutputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Add new server with duplicate ID check
  const handleAddServer = (newServer) => {
    setServers((prev) => {
      if (prev.some((s) => s.id === newServer.id)) {
        alert('Server with this ID already exists!');
        return prev;
      }
      return [...prev, newServer];
    });
  };

  // Delete server by ID
  const handleDeleteServer = (serverId) => {
    setServers((prev) => prev.filter((s) => s.id !== serverId));
    // Also clean command inputs and outputs for deleted server
    setCommandInputs((prev) => {
      const copy = { ...prev };
      delete copy[serverId];
      return copy;
    });
    setCommandOutputs((prev) => {
      const copy = { ...prev };
      delete copy[serverId];
      return copy;
    });
  };

  // Update command input per server
  const handleCommandChange = (serverId, value) => {
    setCommandInputs((prev) => ({ ...prev, [serverId]: value }));
  };

  // Run command (simulated) and save output
  const runCommand = (serverId) => {
    const command = commandInputs[serverId];
    if (!command) return;

    // Simulate async command run, you can replace with API call here
    const output = `Running "${command}" on server ${serverId}... Done.`;

    setCommandOutputs((prev) => ({ ...prev, [serverId]: output }));
    setCommandInputs((prev) => ({ ...prev, [serverId]: '' }));
  };

  // Filter servers by name for search
  const filteredServers = servers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" style={{ paddingTop: 24 }}>
        <Header />

        <ServerForm onSubmit={handleAddServer} />

        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: 20,
            padding: 8,
            width: '100%',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          aria-label="Search servers by name"
        />

        <ServerList
          servers={filteredServers}
          onDelete={handleDeleteServer}
          commandInputs={commandInputs}
          commandOutputs={commandOutputs}
          onCommandChange={handleCommandChange}
          onRunCommand={runCommand}
        />
      </Container>
    </>
  );
}

export default App;