import React from 'react';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        TASK 3
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        Web UI Front End
      </Typography>
    </div>
  );
}

export default Header;
