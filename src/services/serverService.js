import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

// Get all servers
export const getAllServers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/servers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new server
export const addServer = async (server) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servers`, server);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a server by ID
export const deleteServer = async (serverId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/servers/${serverId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
