import { createSlice } from '@reduxjs/toolkit'

const simulationSlice = createSlice({
  name: 'simulation',
  initialState: {
    isRunning: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 50,
    speed: 500, // ms per step
    results: [],
    graphData: [],
  },
  reducers: {
    startSimulation: (state) => {
      state.isRunning = true
      state.isPaused = false
    },
    pauseSimulation: (state) => {
      state.isPaused = true
    },
    resumeSimulation: (state) => {
      state.isPaused = false
    },
    stopSimulation: (state) => {
      state.isRunning = false
      state.isPaused = false
      state.currentStep = 0
    },
    resetSimulation: (state) => {
      state.currentStep = 0
      state.results = []
      state.graphData = []
    },
    setSpeed: (state, action) => {
      state.speed = action.payload
    },
    updateStep: (state, action) => {
      state.currentStep = action.payload
    },
    addResult: (state, action) => {
      state.results.push(action.payload)
      state.graphData.push(action.payload)
    },
    setGraphData: (state, action) => {
      state.graphData = action.payload
    },
  },
})

export const {
  startSimulation,
  pauseSimulation,
  resumeSimulation,
  stopSimulation,
  resetSimulation,
  setSpeed,
  updateStep,
  addResult,
  setGraphData,
} = simulationSlice.actions

export default simulationSlice.reducer
