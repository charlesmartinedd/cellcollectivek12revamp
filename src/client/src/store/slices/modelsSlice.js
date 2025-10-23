import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunks
export const fetchModels = createAsyncThunk('models/fetchModels', async () => {
  const response = await axios.get('/api/models')
  return response.data.models
})

export const fetchModelById = createAsyncThunk('models/fetchModelById', async (modelId) => {
  const response = await axios.get(`/api/models/${modelId}`)
  return response.data.model
})

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    list: [],
    currentModel: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentModel: (state, action) => {
      state.currentModel = action.payload
    },
    clearCurrentModel: (state) => {
      state.currentModel = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchModelById.fulfilled, (state, action) => {
        state.currentModel = action.payload
      })
  },
})

export const { setCurrentModel, clearCurrentModel } = modelsSlice.actions
export default modelsSlice.reducer
