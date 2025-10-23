import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const SimulationGraph = () => {
  const { graphData, isRunning, history } = useSelector((state) => state.simulation)
  const { components } = useSelector((state) => state.editor)
  const chartRef = useRef(null)
  const [viewType, setViewType] = React.useState('line')

  // Convert simulation history to chart series data
  const getChartSeriesData = () => {
    if (components.length === 0 || history.length === 0) {
      return []
    }

    // Create a series for each component
    return components.map((component) => ({
      name: component.name,
      data: history.map((entry) => (entry.states[component.id] ? 1 : 0)),
      color: component.color,
      marker: {
        symbol: 'circle',
      },
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
      formatter: function () {
        let tooltip = `<b>Step ${this.x}</b><br/>`
        this.points.forEach((point) => {
          const value = point.y === 1 ? 'ON' : 'OFF'
          const color = point.series.color
          tooltip += `<span style="color:${color}">\u25CF</span> ${point.series.name}: <b>${value}</b><br/>`
        })
        return tooltip
      },
    },
    series: getChartSeriesData(),
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
    },
  }

  // Update chart when history changes
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart && history.length > 0) {
      // Generate new series data
      const newSeries = components.map((component) => ({
        name: component.name,
        data: history.map((entry) => (entry.states[component.id] ? 1 : 0)),
        color: component.color,
        marker: {
          symbol: 'circle',
        },
      }))

      const chart = chartRef.current.chart

      // Update series data
      while (chart.series.length > 0) {
        chart.series[0].remove(false)
      }

      newSeries.forEach((series) => {
        chart.addSeries(series, false)
      })

      chart.redraw()
    }
  }, [history, components])

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
