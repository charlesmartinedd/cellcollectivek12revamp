import { createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    mode: 'wizard', // 'wizard' or 'advanced'
    components: [],
    connections: [],
    selectedComponent: null,
    selectedConnection: null,
    hasUnsavedChanges: false,
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload
    },
    addComponent: (state, action) => {
      state.components.push(action.payload)
      state.hasUnsavedChanges = true
    },
    removeComponent: (state, action) => {
      state.components = state.components.filter((c) => c.id !== action.payload)
      state.hasUnsavedChanges = true
    },
    updateComponent: (state, action) => {
      const index = state.components.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.components[index] = { ...state.components[index], ...action.payload }
        state.hasUnsavedChanges = true
      }
    },
    addConnection: (state, action) => {
      state.connections.push(action.payload)
      state.hasUnsavedChanges = true
    },
    removeConnection: (state, action) => {
      state.connections = state.connections.filter((c) => c.id !== action.payload)
      state.hasUnsavedChanges = true
    },
    selectComponent: (state, action) => {
      state.selectedComponent = action.payload
    },
    selectConnection: (state, action) => {
      state.selectedConnection = action.payload
    },
    clearSelection: (state) => {
      state.selectedComponent = null
      state.selectedConnection = null
    },
    saveModel: (state) => {
      state.hasUnsavedChanges = false
    },
    loadModel: (state, action) => {
      state.components = action.payload.components || []
      state.connections = action.payload.connections || []
      state.hasUnsavedChanges = false
    },
  },
})

export const {
  setMode,
  addComponent,
  removeComponent,
  updateComponent,
  addConnection,
  removeConnection,
  selectComponent,
  selectConnection,
  clearSelection,
  saveModel,
  loadModel,
} = editorSlice.actions

export default editorSlice.reducer
