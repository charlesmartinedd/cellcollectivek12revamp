import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateStep,
  stopSimulation,
  setGraphData,
  setCurrentStates,
} from '../store/slices/simulationSlice'
import { updateComponent } from '../store/slices/editorSlice'
import {
  simulateOneStep,
  initializeStates,
  statesToArray,
  isSteadyState,
} from '../utils/booleanSimulation'

/**
 * Custom hook for managing Boolean simulation
 * Integrates the simulation engine with Redux state
 */
export const useSimulation = () => {
  const dispatch = useDispatch()
  const { isRunning, isPaused, currentStep, totalSteps, speed, history } = useSelector(
    (state) => state.simulation
  )
  const { components, connections } = useSelector((state) => state.editor)

  const intervalRef = useRef(null)
  const currentStatesRef = useRef({})

  /**
   * Initialize simulation states from components
   */
  const initializeSimulation = useCallback(() => {
    const initialStates = initializeStates(components)
    currentStatesRef.current = initialStates
    dispatch(setCurrentStates(initialStates))

    // Update initial step in history
    dispatch(
      updateStep({
        step: 0,
        states: initialStates,
      })
    )

    // Generate initial graph data
    const graphData = statesToArray(initialStates, components)
    dispatch(setGraphData([{ step: 0, data: graphData }]))
  }, [components, dispatch])

  /**
   * Run one simulation step
   */
  const runOneStep = useCallback(() => {
    // Calculate next states using Boolean simulation engine
    const nextStates = simulateOneStep(components, connections, currentStatesRef.current)

    // Update ref
    currentStatesRef.current = nextStates

    // Calculate next step number
    const nextStep = currentStep + 1

    // Update Redux state
    dispatch(
      updateStep({
        step: nextStep,
        states: nextStates,
      })
    )

    // Update component states in editor (for visual feedback)
    Object.keys(nextStates).forEach((componentId) => {
      dispatch(
        updateComponent({
          id: componentId,
          state: nextStates[componentId],
        })
      )
    })

    // Add to graph data
    const graphDataPoint = statesToArray(nextStates, components)
    dispatch(setGraphData([...history, { step: nextStep, data: graphDataPoint }]))

    // Check for steady state
    if (history.length > 0) {
      const previousStates = history[history.length - 1].states
      if (isSteadyState(nextStates, previousStates)) {
        console.log('Steady state reached at step', nextStep)
        dispatch(stopSimulation())
      }
    }

    // Check if we've reached the max steps
    if (nextStep >= totalSteps) {
      console.log('Maximum steps reached')
      dispatch(stopSimulation())
    }
  }, [components, connections, currentStep, totalSteps, dispatch, history])

  /**
   * Simulation loop effect
   */
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Initialize on first run
      if (currentStep === 0 && history.length === 0) {
        initializeSimulation()
      }

      // Start interval for simulation steps
      intervalRef.current = setInterval(() => {
        runOneStep()
      }, speed)
    } else {
      // Clear interval when paused or stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isPaused, speed, currentStep, history.length, initializeSimulation, runOneStep])

  return {
    initializeSimulation,
    runOneStep,
  }
}
