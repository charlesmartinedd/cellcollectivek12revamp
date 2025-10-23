import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    tutorialActive: false,
    currentTutorial: null,
    showHelp: false,
    sidebarOpen: true,
    theme: 'light',
  },
  reducers: {
    startTutorial: (state, action) => {
      state.tutorialActive = true
      state.currentTutorial = action.payload
    },
    endTutorial: (state) => {
      state.tutorialActive = false
      state.currentTutorial = null
    },
    toggleHelp: (state) => {
      state.showHelp = !state.showHelp
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const {
  startTutorial,
  endTutorial,
  toggleHelp,
  toggleSidebar,
  setTheme,
} = uiSlice.actions

export default uiSlice.reducer
