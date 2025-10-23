import React from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import SimulationControls from '../components/Simulation/SimulationControls'
import SimulationGraph from '../components/Visualization/SimulationGraph'

const SimulationPage = () => {
  const { modelId } = useParams()

  return (
    <Box sx={{ pb: 2 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🔬 Simulation: Photosynthesis Model
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Watch how plants convert sunlight into energy! Run the simulation to see components interact.
      </Typography>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Network Visualization */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 500 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              🌐 Network View
            </Typography>
            <Box
              sx={{
                height: 400,
                backgroundColor: '#F5F5F5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Network visualization will appear here (ccnetviz)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Graph Visualization */}
        <Grid item xs={12} md={6}>
          <SimulationGraph />
        </Grid>

        {/* Component List */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              📋 Component States
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Component states will be displayed here during simulation
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Simulation Controls (Fixed at bottom) */}
      <Box sx={{ mt: 3 }}>
        <SimulationControls />
      </Box>
    </Box>
  )
}

export default SimulationPage
