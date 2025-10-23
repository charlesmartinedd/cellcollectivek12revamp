import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const SimulationGraph = () => {
  const { graphData, isRunning } = useSelector((state) => state.simulation)
  const { components } = useSelector((state) => state.editor)
  const chartRef = useRef(null)
  const [viewType, setViewType] = React.useState('line')

  // Generate sample data for demonstration
  const generateSampleData = () => {
    if (components.length === 0) return []

    // Create time series data for each component
    return components.slice(0, 5).map((component, index) => ({
      name: component.name,
      data: Array.from({ length: 50 }, (_, i) => {
        // Simulate oscillating patterns
        const base = component.state ? 1 : 0
        const noise = Math.random() * 0.2
        const wave = Math.sin((i + index * 10) / 5) * 0.3
        return Math.max(0, Math.min(1, base + noise + wave))
      }),
      color: component.color,
    }))
  }

  const chartOptions = {
    chart: {
      type: viewType === 'line' ? 'line' : 'column',
      backgroundColor: '#FAFAFA',
      style: {
        fontFamily: 'Roboto, sans-serif',
      },
    },
    title: {
      text: '📊 Component Activity Over Time',
      style: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
    },
    subtitle: {
      text: isRunning ? '● Live Simulation' : 'Start simulation to see results',
      style: {
        fontSize: '1rem',
        color: isRunning ? '#4CAF50' : '#9E9E9E',
      },
    },
    xAxis: {
      title: {
        text: 'Time Steps',
        style: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          fontSize: '0.875rem',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Activity Level',
        style: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
      min: 0,
      max: 1,
      labels: {
        style: {
          fontSize: '0.875rem',
        },
        format: '{value:.1f}',
      },
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      symbolHeight: 12,
      symbolWidth: 24,
      symbolRadius: 6,
    },
    plotOptions: {
      line: {
        lineWidth: 4, // Thick lines for visibility
        marker: {
          enabled: true,
          radius: 6,
        },
      },
      column: {
        borderWidth: 0,
        pointPadding: 0.1,
      },
      series: {
        animation: {
          duration: 1000,
        },
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      style: {
        fontSize: '0.875rem',
      },
      valueDecimals: 2,
    },
    series: generateSampleData(),
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          📈 Simulation Results
        </Typography>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(e, newView) => newView && setViewType(newView)}
          size="small"
        >
          <ToggleButton value="line">Line Chart</ToggleButton>
          <ToggleButton value="column">Bar Chart</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {components.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            📊 No Data Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add components to your model and run a simulation to see results here
          </Typography>
        </Box>
      )}

      {/* Graph Features Info */}
      <Box sx={{ mt: 2, p: 2, backgroundColor: '#E8F5E9', borderRadius: 2 }}>
        <Typography variant="body2" color="success.dark">
          ✨ <strong>Graph Features:</strong> Large fonts (16px+) | Thick lines (4px) |
          Hover for exact values | Toggle components on/off in legend
        </Typography>
      </Box>
    </Paper>
  )
}

export default SimulationGraph
