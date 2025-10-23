import React from 'react'
import { Box, Typography, Paper, Button, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Save as SaveIcon, FolderOpen as OpenIcon } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import ComponentLibrary from '../components/Editor/ComponentLibrary'
import EditorCanvas from '../components/Editor/EditorCanvas'

const EditorPage = () => {
  const { components, mode } = useSelector((state) => state.editor)
  const [editorMode, setEditorMode] = React.useState('edit')

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
              >
                Load Model
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                size="large"
                sx={{ minHeight: 44 }}
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
            <EditorCanvas />
          </Box>
        </Box>
      </Box>
    </DndProvider>
  )
}

export default EditorPage
