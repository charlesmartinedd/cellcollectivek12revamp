/**
 * Model Loader Utility
 * Functions for loading and saving models
 */

/**
 * Load a pre-built model from JSON file
 * @param {string} modelId - The model ID (e.g., 'photosynthesis')
 * @returns {Promise<Object>} - The model data
 */
export async function loadPrebuiltModel(modelId) {
  try {
    const response = await fetch(`/models/${modelId}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load model: ${modelId}`)
    }
    const modelData = await response.json()
    return modelData
  } catch (error) {
    console.error('Error loading model:', error)
    throw error
  }
}

/**
 * Load model from localStorage
 * @param {string} modelId - The model ID
 * @returns {Object|null} - The model data or null if not found
 */
export function loadModelFromStorage(modelId) {
  try {
    const savedModel = localStorage.getItem(`model_${modelId}`)
    if (savedModel) {
      return JSON.parse(savedModel)
    }
    return null
  } catch (error) {
    console.error('Error loading model from storage:', error)
    return null
  }
}

/**
 * Save model to localStorage
 * @param {string} modelId - The model ID
 * @param {Object} modelData - The model data to save
 */
export function saveModelToStorage(modelId, modelData) {
  try {
    localStorage.setItem(`model_${modelId}`, JSON.stringify(modelData))
    return true
  } catch (error) {
    console.error('Error saving model to storage:', error)
    return false
  }
}

/**
 * Export model as JSON file
 * @param {Object} modelData - The model data
 * @param {string} filename - The filename (without extension)
 */
export function exportModelAsJSON(modelData, filename = 'model') {
  const json = JSON.stringify(modelData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Import model from JSON file
 * @param {File} file - The file to import
 * @returns {Promise<Object>} - The model data
 */
export function importModelFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const modelData = JSON.parse(e.target.result)
        resolve(modelData)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

/**
 * Get list of available pre-built models
 * @returns {Array} - Array of model metadata
 */
export function getAvailableModels() {
  return [
    {
      id: 'photosynthesis-v1',
      name: 'Photosynthesis Model',
      description: 'Learn how plants convert sunlight into energy',
      difficulty: 'beginner',
      grade: '6-8',
      thumbnail: '/models/thumbnails/photosynthesis.png',
      tags: ['plants', 'energy', 'biology'],
    },
    {
      id: 'simple-feedback-v1',
      name: 'Simple Feedback Loop',
      description: 'Basic positive and negative feedback regulation',
      difficulty: 'beginner',
      grade: '6-8',
      thumbnail: '/models/thumbnails/feedback.png',
      tags: ['regulation', 'homeostasis', 'feedback'],
    },
    // More models will be added here
  ]
}

/**
 * Validate model data structure
 * @param {Object} modelData - The model data to validate
 * @returns {Object} - { valid: boolean, errors: Array }
 */
export function validateModel(modelData) {
  const errors = []

  if (!modelData.id) {
    errors.push('Model must have an id')
  }

  if (!modelData.name) {
    errors.push('Model must have a name')
  }

  if (!Array.isArray(modelData.components)) {
    errors.push('Model must have a components array')
  }

  if (!Array.isArray(modelData.connections)) {
    errors.push('Model must have a connections array')
  }

  // Validate component structure
  if (modelData.components) {
    modelData.components.forEach((component, index) => {
      if (!component.id) {
        errors.push(`Component at index ${index} must have an id`)
      }
      if (!component.name) {
        errors.push(`Component at index ${index} must have a name`)
      }
    })
  }

  // Validate connection structure
  if (modelData.connections) {
    modelData.connections.forEach((connection, index) => {
      if (!connection.source) {
        errors.push(`Connection at index ${index} must have a source`)
      }
      if (!connection.target) {
        errors.push(`Connection at index ${index} must have a target`)
      }
      if (!['activation', 'inhibition'].includes(connection.type)) {
        errors.push(`Connection at index ${index} must have type 'activation' or 'inhibition'`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Create empty model template
 * @param {string} name - The model name
 * @returns {Object} - Empty model template
 */
export function createEmptyModel(name = 'New Model') {
  return {
    id: `model-${Date.now()}`,
    name,
    description: '',
    grade: '6-8',
    difficulty: 'beginner',
    components: [],
    connections: [],
    instructions: [],
    quiz: [],
  }
}
