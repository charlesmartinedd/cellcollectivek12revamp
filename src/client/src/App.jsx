import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ModelBrowserPage from './pages/ModelBrowserPage'
import SimulationPage from './pages/SimulationPage'
import EditorPage from './pages/EditorPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelBrowserPage />} />
          <Route path="/simulation/:modelId" element={<SimulationPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:modelId" element={<EditorPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
