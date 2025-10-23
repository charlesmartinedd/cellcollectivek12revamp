import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Paper,
  IconButton,
  Slider,
  Typography,
  Button,
  Chip,
  Alert,
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Refresh as ResetIcon,
  BarChart as ResultsIcon,
  SkipNext as StepIcon,
} from '@mui/icons-material'
import {
  startSimulation,
  pauseSimulation,
  resumeSimulation,
  stopSimulation,
  resetSimulation,
  setSpeed,
} from '../../store/slices/simulationSlice'
import { useSimulation } from '../../hooks/useSimulation'

const SimulationControls = () => {
  const dispatch = useDispatch()
  const { isRunning, isPaused, currentStep, totalSteps, speed } = useSelector(
    (state) => state.simulation
  )
  const { components, connections } = useSelector((state) => state.editor)

  // Use the simulation hook
  const { initializeSimulation, runOneStep } = useSimulation()

  const canSimulate = components.length > 0 && connections.length > 0

  const handlePlayPause = () => {
    if (!canSimulate) {
      alert('Please add components and connections before running simulation')
      return
    }

    if (!isRunning) {
      dispatch(startSimulation())
    } else if (isPaused) {
      dispatch(resumeSimulation())
    } else {
      dispatch(pauseSimulation())
    }
  }

  const handleStop = () => {
    dispatch(stopSimulation())
  }

  const handleReset = () => {
    dispatch(resetSimulation())
  }

  const handleStep = () => {
    if (!canSimulate) {
      alert('Please add components and connections before running simulation')
      return
    }

    if (!isRunning) {
      // Initialize if first step
      initializeSimulation()
      dispatch(startSimulation())
    }
    // Run one step manually
    runOneStep()
    // Pause so it doesn't continue automatically
    dispatch(pauseSimulation())
  }

  const handleSpeedChange = (event, newValue) => {
    // Convert slider value to milliseconds
    // Lower value = faster (less delay between steps)
    const speedMap = {
      1: 1000, // Slow (1 second per step)
      2: 500,  // Medium-slow
      3: 250,  // Medium
      4: 100,  // Fast
      5: 50,   // Very fast
    }
    dispatch(setSpeed(speedMap[newValue]))
  }

  const getSpeedLabel = () => {
    if (speed >= 1000) return '🐢 Slow'
    if (speed >= 500) return 'Medium-Slow'
    if (speed >= 250) return 'Medium'
    if (speed >= 100) return '🐰 Fast'
    return '⚡ Very Fast'
  }

  const getSpeedValue = () => {
    if (speed >= 1000) return 1
    if (speed >= 500) return 2
    if (speed >= 250) return 3
    if (speed >= 100) return 4
    return 5
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault()
          if (!canSimulate) {
            alert('Please add components and connections before running simulation')
            return
          }
          if (!isRunning) {
            dispatch(startSimulation())
          } else if (isPaused) {
            dispatch(resumeSimulation())
          } else {
            dispatch(pauseSimulation())
          }
          break
        case 'r':
          e.preventDefault()
          dispatch(resetSimulation())
          break
        case 's':
          e.preventDefault()
          dispatch(stopSimulation())
          break
        case 'n':
          e.preventDefault()
          if (!canSimulate) {
            alert('Please add components and connections before running simulation')
            return
          }
          if (!isRunning) {
            initializeSimulation()
            dispatch(startSimulation())
          }
          runOneStep()
          dispatch(pauseSimulation())
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isRunning, isPaused, canSimulate, dispatch, initializeSimulation, runOneStep])

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        p: 3,
        backgroundColor: 'background.paper',
        borderTop: '3px solid',
        borderColor: 'primary.main',
        zIndex: 100,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight={600}>
        ⚙️ Simulation Controls
      </Typography>

      {/* Warning if no components/connections */}
      {!canSimulate && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please add components and create connections in the Editor before running a simulation.
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Main Control Buttons - Large and Clear */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            onClick={handlePlayPause}
            disabled={!canSimulate}
            size="large"
            sx={{
              width: 60,
              height: 60,
              backgroundColor: isRunning && !isPaused ? 'warning.main' : 'success.main',
              color: 'white',
              '&:hover': {
                backgroundColor: isRunning && !isPaused ? 'warning.dark' : 'success.dark',
              },
              '&:disabled': {
                backgroundColor: '#BDBDBD',
                color: 'white',
              },
            }}
          >
            {isRunning && !isPaused ? <PauseIcon fontSize="large" /> : <PlayIcon fontSize="large" />}
          </IconButton>

          <IconButton
            onClick={handleStop}
            disabled={!isRunning}
            size="large"
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
              '&:disabled': {
                backgroundColor: '#BDBDBD',
                color: 'white',
              },
            }}
          >
            <StopIcon fontSize="large" />
          </IconButton>

          <IconButton
            onClick={handleReset}
            size="large"
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'info.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'info.dark',
              },
            }}
          >
            <ResetIcon fontSize="large" />
          </IconButton>

          <IconButton
            onClick={handleStep}
            disabled={!canSimulate}
            size="large"
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'secondary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
              '&:disabled': {
                backgroundColor: '#BDBDBD',
                color: 'white',
              },
            }}
            title="Step forward one frame"
          >
            <StepIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Speed Control */}
        <Box sx={{ flexGrow: 1, minWidth: 200, maxWidth: 400 }}>
          <Typography variant="body2" gutterBottom fontWeight={600}>
            Speed: {getSpeedLabel()}
          </Typography>
          <Slider
            value={getSpeedValue()}
            onChange={handleSpeedChange}
            min={1}
            max={5}
            step={1}
            marks={[
              { value: 1, label: '🐢' },
              { value: 3, label: 'Medium' },
              { value: 5, label: '🐰' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              const labels = ['', 'Slow', 'Medium-Slow', 'Medium', 'Fast', 'Very Fast']
              return labels[value]
            }}
            sx={{
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
              },
              '& .MuiSlider-track': {
                height: 8,
              },
              '& .MuiSlider-rail': {
                height: 8,
              },
            }}
          />
        </Box>

        {/* Status Indicator */}
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="body2" gutterBottom fontWeight={600}>
            Status:
          </Typography>
          <Chip
            label={
              isRunning
                ? isPaused
                  ? 'PAUSED'
                  : 'RUNNING'
                : 'STOPPED'
            }
            color={
              isRunning
                ? isPaused
                  ? 'warning'
                  : 'success'
                : 'default'
            }
            sx={{ fontSize: '1rem', fontWeight: 600, minWidth: 100 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Step {currentStep} of {totalSteps}
          </Typography>
        </Box>

        {/* View Results Button */}
        <Button
          variant="contained"
          startIcon={<ResultsIcon />}
          size="large"
          sx={{ minHeight: 44 }}
        >
          View Results
        </Button>
      </Box>

      {/* Keyboard Shortcuts Help */}
      <Box sx={{ mt: 2, p: 2, backgroundColor: '#E3F2FD', borderRadius: 2 }}>
        <Typography variant="caption" color="primary.dark">
          ⌨️ <strong>Keyboard Shortcuts:</strong> Space = Play/Pause | R = Reset | S = Stop | N = Next Step
        </Typography>
      </Box>
    </Paper>
  )
}

export default SimulationControls
