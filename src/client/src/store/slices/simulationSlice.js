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
    history: [], // Full simulation history
    currentStates: {}, // Current component states {componentId: boolean}
  },
  reducers: {
    startSimulation: (state) => {
      state.isRunning = true
      state.isPaused = false
      state.currentStep = 0
      state.history = []
      state.results = []
      state.graphData = []
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
    },
    resetSimulation: (state) => {
      state.currentStep = 0
      state.results = []
      state.graphData = []
      state.history = []
      state.currentStates = {}
      state.isRunning = false
      state.isPaused = false
    },
    setSpeed: (state, action) => {
      state.speed = action.payload
    },
    updateStep: (state, action) => {
      state.currentStep = action.payload.step
      state.currentStates = action.payload.states

      // Add to history
      state.history.push({
        step: action.payload.step,
        states: action.payload.states,
      })
    },
    addResult: (state, action) => {
      state.results.push(action.payload)
      state.graphData.push(action.payload)
    },
    setGraphData: (state, action) => {
      state.graphData = action.payload
    },
    setCurrentStates: (state, action) => {
      state.currentStates = action.payload
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
  setCurrentStates,
} = simulationSlice.actions

export default simulationSlice.reducer
