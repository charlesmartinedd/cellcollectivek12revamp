/**
 * Boolean Simulation Engine for Cell Collective K-12
 * Simplified Boolean logic evaluation for middle school students
 */

/**
 * Evaluate the next state of a component based on its inputs
 * Uses simple OR logic for activation and AND logic for inhibition
 *
 * @param {Object} component - The component to evaluate
 * @param {Array} connections - All connections in the model
 * @param {Object} currentStates - Current state of all components {componentId: boolean}
 * @returns {boolean} - Next state of the component
 */
export function evaluateComponentNextState(component, connections, currentStates) {
  // Find all incoming connections to this component
  const incomingConnections = connections.filter(conn => conn.target === component.id)

  if (incomingConnections.length === 0) {
    // No inputs - keep current state
    return currentStates[component.id] || false
  }

  // Separate activation and inhibition inputs
  const activations = incomingConnections.filter(conn => conn.type === 'activation')
  const inhibitions = incomingConnections.filter(conn => conn.type === 'inhibition')

  // Count active inputs
  const activeActivations = activations.filter(conn => currentStates[conn.source] === true)
  const activeInhibitions = inhibitions.filter(conn => currentStates[conn.source] === true)

  // Simple Boolean logic:
  // - If ANY activation input is ON → component tends to be ON
  // - If ANY inhibition input is ON → component tends to be OFF
  // - Inhibition overrides activation (more realistic for biological systems)

  if (activeInhibitions.length > 0) {
    // At least one inhibitor is active → turn OFF
    return false
  }

  if (activeActivations.length > 0) {
    // At least one activator is active (and no inhibitors) → turn ON
    return true
  }

  // No active inputs → turn OFF (default behavior)
  return false
}

/**
 * Run one step of the simulation
 *
 * @param {Array} components - All components in the model
 * @param {Array} connections - All connections in the model
 * @param {Object} currentStates - Current state of all components
 * @returns {Object} - New state object {componentId: boolean}
 */
export function simulateOneStep(components, connections, currentStates) {
  const nextStates = {}

  // Evaluate each component
  components.forEach(component => {
    nextStates[component.id] = evaluateComponentNextState(component, connections, currentStates)
  })

  return nextStates
}

/**
 * Initialize states from components
 *
 * @param {Array} components - All components in the model
 * @returns {Object} - Initial state object {componentId: boolean}
 */
export function initializeStates(components) {
  const states = {}
  components.forEach(component => {
    states[component.id] = component.state || false
  })
  return states
}

/**
 * Convert states object to array format for graphing
 *
 * @param {Object} states - State object {componentId: boolean}
 * @param {Array} components - All components
 * @returns {Array} - Array of {componentId, name, state} objects
 */
export function statesToArray(states, components) {
  return components.map(component => ({
    id: component.id,
    name: component.name,
    state: states[component.id] ? 1 : 0, // Convert to number for graphing
    color: component.color,
  }))
}

/**
 * Run full simulation for N steps
 *
 * @param {Array} components - All components in the model
 * @param {Array} connections - All connections in the model
 * @param {number} steps - Number of steps to simulate
 * @param {Function} onStep - Callback for each step (stepNumber, states)
 * @returns {Array} - History of all states
 */
export async function runSimulation(components, connections, steps, onStep) {
  const history = []
  let currentStates = initializeStates(components)

  // Add initial state
  history.push({ step: 0, states: { ...currentStates } })
  if (onStep) onStep(0, currentStates)

  // Run simulation steps
  for (let i = 1; i <= steps; i++) {
    currentStates = simulateOneStep(components, connections, currentStates)
    history.push({ step: i, states: { ...currentStates } })

    if (onStep) {
      onStep(i, currentStates)
    }

    // Small delay to allow UI updates
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  return history
}

/**
 * Check if the system has reached a steady state (no changes)
 *
 * @param {Object} currentStates - Current state
 * @param {Object} previousStates - Previous state
 * @returns {boolean} - True if steady state reached
 */
export function isStea dyState(currentStates, previousStates) {
  const keys = Object.keys(currentStates)
  return keys.every(key => currentStates[key] === previousStates[key])
}

/**
 * Detect oscillations in the system
 *
 * @param {Array} history - Array of state history
 * @param {number} lookback - How many steps to look back
 * @returns {boolean} - True if oscillation detected
 */
export function detectOscillation(history, lookback = 5) {
  if (history.length < lookback * 2) return false

  const recent = history.slice(-lookback)
  const earlier = history.slice(-lookback * 2, -lookback)

  // Simple oscillation detection: check if recent states match earlier states
  for (let i = 0; i < lookback; i++) {
    const recentState = JSON.stringify(recent[i].states)
    const earlierState = JSON.stringify(earlier[i].states)
    if (recentState !== earlierState) return false
  }

  return true
}
