import { configureStore } from '@reduxjs/toolkit'
import modelsReducer from './slices/modelsSlice'
import simulationReducer from './slices/simulationSlice'
import editorReducer from './slices/editorSlice'
import quizReducer from './slices/quizSlice'
import uiReducer from './slices/uiSlice'

const store = configureStore({
  reducer: {
    models: modelsReducer,
    simulation: simulationReducer,
    editor: editorReducer,
    quiz: quizReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For Socket.IO and complex objects
    }),
})

export default store
