import React, { useRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import ComponentLibrary from '../components/Editor/ComponentLibrary'
import EditorCanvas from '../components/Editor/EditorCanvas'
import { loadModel, saveModel } from '../store/slices/editorSlice'
import {
  loadPrebuiltModel,
  exportModelAsJSON,
  importModelFromJSON,
  getAvailableModels,
} from '../utils/modelLoader'

const EditorPage = () => {
  const dispatch = useDispatch()
  const { components, connections } = useSelector((state) => state.editor)
  const [editorMode, setEditorMode] = React.useState('edit')
  const [loadMenuAnchor, setLoadMenuAnchor] = React.useState(null)
  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false)
  const [modelName, setModelName] = React.useState('My Model')
  const fileInputRef = useRef(null)

  const handleLoadMenuOpen = (event) => {
    setLoadMenuAnchor(event.currentTarget)
  }

  const handleLoadMenuClose = () => {
    setLoadMenuAnchor(null)
  }

  const handleLoadPrebuiltModel = async (modelId) => {
    try {
      const modelData = await loadPrebuiltModel(modelId)
      dispatch(loadModel(modelData))
      setModelName(modelData.name)
      handleLoadMenuClose()
      alert(`Loaded: ${modelData.name}`)
    } catch (error) {
      alert('Failed to load model. Please try again.')
      console.error(error)
    }
  }

  const handleLoadFromFile = () => {
    fileInputRef.current?.click()
    handleLoadMenuClose()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const modelData = await importModelFromJSON(file)
        dispatch(loadModel(modelData))
        setModelName(modelData.name)
        alert(`Loaded: ${modelData.name}`)
      } catch (error) {
        alert('Failed to import model. Please check the file format.')
        console.error(error)
      }
    }
    // Reset file input
    event.target.value = ''
  }

  const handleSaveClick = () => {
    setSaveDialogOpen(true)
  }

  const handleSaveConfirm = () => {
    const modelData = {
      id: `model-${Date.now()}`,
      name: modelName,
      description: '',
      grade: '6-8',
      difficulty: 'beginner',
      components,
      connections,
      instructions: [],
      quiz: [],
    }

    // Export as JSON file
    exportModelAsJSON(modelData, modelName.toLowerCase().replace(/\s+/g, '-'))

    dispatch(saveModel(modelData))
    setSaveDialogOpen(false)
    alert(`Saved: ${modelName}`)
  }

  const availableModels = getAvailableModels()

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header with controls */}
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                🎨 Model Editor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Drag components from the library onto the canvas to build your model
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Mode Toggle */}
              <ToggleButtonGroup
                value={editorMode}
                exclusive
                onChange={(e, newMode) => newMode && setEditorMode(newMode)}
                size="large"
              >
                <ToggleButton value="edit">
                  ✏️ Edit Mode
                </ToggleButton>
                <ToggleButton value="connect">
                  🔗 Connect Mode
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Save/Load Buttons */}
              <Button
                variant="outlined"
                startIcon={<OpenIcon />}
                size="large"
                sx={{ minHeight: 44 }}
                onClick={handleLoadMenuOpen}
              >
                Load Model
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                size="large"
                sx={{ minHeight: 44 }}
                onClick={handleSaveClick}
                disabled={components.length === 0}
              >
                Save Model
              </Button>

              {/* Component Count */}
              <Chip
                label={`${components.length} Components`}
                color="primary"
                sx={{ fontSize: '1rem', minHeight: 36 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Main Editor Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, overflow: 'hidden' }}>
          {/* Component Library Sidebar */}
          <ComponentLibrary />

          {/* Canvas Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <EditorCanvas isConnectMode={editorMode === 'connect'} />
          </Box>
        </Box>

        {/* Hidden file input for importing */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Load Menu */}
        <Menu
          anchorEl={loadMenuAnchor}
          open={Boolean(loadMenuAnchor)}
          onClose={handleLoadMenuClose}
        >
          <MenuItem disabled sx={{ fontWeight: 600, color: 'primary.main' }}>
            Pre-built Models:
          </MenuItem>
          {availableModels.map((model) => (
            <MenuItem key={model.id} onClick={() => handleLoadPrebuiltModel(model.id)}>
              {model.name}
            </MenuItem>
          ))}
          <MenuItem divider disabled />
          <MenuItem onClick={handleLoadFromFile}>
            📁 Import from File...
          </MenuItem>
        </Menu>

        {/* Save Dialog */}
        <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>💾 Save Model</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter a name for your model. It will be exported as a JSON file that you can share or load later.
            </Typography>
            <TextField
              autoFocus
              fullWidth
              label="Model Name"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              variant="outlined"
              sx={{ mt: 1 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {components.length} components, {connections.length} connections
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSaveConfirm}
              variant="contained"
              disabled={!modelName.trim()}
            >
              Save & Export
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DndProvider>
  )
}

export default EditorPage
