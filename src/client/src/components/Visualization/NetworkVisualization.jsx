import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Typography, Chip } from '@mui/material'
import ccNetViz from 'ccnetviz'

/**
 * Network Visualization Component
 * Displays the biological network as an interactive graph
 * with components as nodes and connections as edges
 */
const NetworkVisualization = () => {
  const canvasRef = useRef(null)
  const graphRef = useRef(null)
  const { components, connections } = useSelector((state) => state.editor)
  const { currentStates, isRunning } = useSelector((state) => state.simulation)

  /**
   * Convert components and connections to ccNetViz format
   */
  const prepareGraphData = () => {
    // Create nodes from components
    const nodes = components.map((component) => {
      const isActive = currentStates[component.id] || false

      return {
        label: component.name,
        color: isActive ? component.color : '#BDBDBD',
        size: isActive ? 25 : 20, // Larger when active
        id: component.id,
      }
    })

    // Create edges from connections
    const edges = connections.map((connection) => {
      const sourceComponent = components.find((c) => c.id === connection.source)
      const targetComponent = components.find((c) => c.id === connection.target)

      return {
        source: connection.source,
        target: connection.target,
        color: connection.type === 'activation' ? '#4CAF50' : '#F44336',
        width: 3, // Thick edges for visibility
        arrow: connection.type === 'activation' ? 'end' : 'inhibitor',
        type: connection.type,
      }
    })

    return { nodes, edges }
  }

  /**
   * Initialize the network graph
   */
  useEffect(() => {
    if (!canvasRef.current || components.length === 0) return

    const { nodes, edges } = prepareGraphData()

    // Destroy existing graph if it exists
    if (graphRef.current) {
      try {
        graphRef.current.draw()
      } catch (e) {
        console.log('Graph cleanup')
      }
    }

    // Create new graph
    try {
      const graph = new ccNetViz(canvasRef.current, {
        styles: {
          node: {
            minSize: 20,
            maxSize: 30,
            label: {
              hideSize: 0, // Always show labels
              font: '16px Arial, sans-serif',
              color: '#212121',
            },
            color: '#2196F3',
          },
          edge: {
            width: 3,
            arrow: {
              size: 15,
              aspect: 2,
            },
          },
        },
        layout: {
          type: 'force',
          options: {
            iterations: 100,
            attractive: 0.1,
            repulsive: 10,
          },
        },
      })

      graph.set({ nodes, edges }, { layout: 'force' })
      graph.draw()

      graphRef.current = graph
    } catch (error) {
      console.error('Error creating network visualization:', error)
    }

    // Cleanup on unmount
    return () => {
      if (graphRef.current) {
        try {
          graphRef.current.draw()
        } catch (e) {
          console.log('Cleanup')
        }
      }
    }
  }, [components, connections])

  /**
   * Update node colors when simulation state changes
   */
  useEffect(() => {
    if (!graphRef.current || components.length === 0) return

    const { nodes, edges } = prepareGraphData()

    try {
      graphRef.current.set({ nodes, edges })
      graphRef.current.draw()
    } catch (error) {
      console.error('Error updating network:', error)
    }
  }, [currentStates, components, connections])

  /**
   * Handle canvas resize
   */
  useEffect(() => {
    const handleResize = () => {
      if (graphRef.current) {
        try {
          graphRef.current.resize()
          graphRef.current.draw()
        } catch (error) {
          console.error('Error resizing graph:', error)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          🕸️ Network Visualization
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`${components.length} Components`}
            size="small"
            color="primary"
            sx={{ fontSize: '0.875rem' }}
          />
          <Chip
            label={`${connections.length} Connections`}
            size="small"
            color="secondary"
            sx={{ fontSize: '0.875rem' }}
          />
        </Box>
      </Box>

      {components.length > 0 ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              position: 'relative',
              minHeight: 400,
              backgroundColor: '#FAFAFA',
              borderRadius: 2,
              border: '2px solid #E0E0E0',
              overflow: 'hidden',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </Box>

          {/* Legend */}
          <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                }}
              />
              <Typography variant="body2">Component ON</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: '#BDBDBD',
                }}
              />
              <Typography variant="body2">Component OFF</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 30,
                  height: 3,
                  backgroundColor: '#4CAF50',
                }}
              />
              <Typography variant="body2">Activation</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 30,
                  height: 3,
                  backgroundColor: '#F44336',
                }}
              />
              <Typography variant="body2">Inhibition</Typography>
            </Box>
          </Box>

          {/* Info Box */}
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#E3F2FD', borderRadius: 2 }}>
            <Typography variant="body2" color="primary.dark">
              💡 <strong>Interactive Graph:</strong>{' '}
              {isRunning
                ? 'Nodes light up in real-time as the simulation runs!'
                : 'Start the simulation to see components activate and deactivate.'}
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            minHeight: 400,
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            🕸️ No Network Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add components and connections in the Editor to see the network visualization
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default NetworkVisualization
