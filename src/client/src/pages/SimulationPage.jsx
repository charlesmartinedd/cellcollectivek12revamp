import React from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SimulationControls from '../components/Simulation/SimulationControls'
import SimulationGraph from '../components/Visualization/SimulationGraph'
import NetworkVisualization from '../components/Visualization/NetworkVisualization'

const SimulationPage = () => {
  const { modelId } = useParams()
  const { components } = useSelector((state) => state.editor)
  const { currentStates, currentStep } = useSelector((state) => state.simulation)

  return (
    <Box sx={{ pb: 2 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🔬 Simulation: Biological Network Model
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Watch how biological components interact! Run the simulation to see the network in action.
      </Typography>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Network Visualization */}
        <Grid item xs={12} md={6}>
          <NetworkVisualization />
        </Grid>

        {/* Graph Visualization */}
        <Grid item xs={12} md={6}>
          <SimulationGraph />
        </Grid>

        {/* Component States */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              📋 Component States (Step {currentStep})
            </Typography>
            {components.length > 0 ? (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {components.map((component) => {
                  const isActive = currentStates[component.id] || false
                  return (
                    <Grid item xs={6} sm={4} md={3} key={component.id}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: `2px solid ${component.color}`,
                          backgroundColor: isActive ? `${component.color}20` : '#FAFAFA',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.3s',
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{ textAlign: 'center', color: component.color }}
                        >
                          {component.name}
                        </Typography>
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: isActive ? '#4CAF50' : '#9E9E9E',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          {isActive ? 'ON' : 'OFF'}
                        </Box>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No components in the model. Add components in the Editor to begin.
              </Typography>
            )}
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
