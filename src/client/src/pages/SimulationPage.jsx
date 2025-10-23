import React from 'react'
import { Box, Typography } from '@mui/material'

const SimulationPage = () => {
  return (
    <Box>
      <Typography variant="h3">Simulation Page</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This page will contain:
        <ul>
          <li>Network visualization (ccnetviz) with large nodes (80x60px)</li>
          <li>Real-time simulation controls (Play/Pause/Stop/Reset)</li>
          <li>Graph visualization (Highcharts) with 16px+ fonts and 4px lines</li>
          <li>Component list with states</li>
          <li>Speed control slider</li>
          <li>Quiz button</li>
        </ul>
      </Typography>
    </Box>
  )
}

export default SimulationPage
