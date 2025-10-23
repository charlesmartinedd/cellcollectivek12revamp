import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Paper } from '@mui/material'
import { useDrop } from 'react-dnd'
import { addComponent, addConnection } from '../../store/slices/editorSlice'
import ComponentNode from './ComponentNode'
import ConnectionLine from './ConnectionLine'
import ConnectionDialog from './ConnectionDialog'

const EditorCanvas = ({ isConnectMode }) => {
  const dispatch = useDispatch()
  const { components, connections } = useSelector((state) => state.editor)
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [connectionDialogOpen, setConnectionDialogOpen] = useState(false)
  const [pendingConnection, setPendingConnection] = useState({ source: null, target: null })

  const handleComponentClick = (component) => {
    if (isConnectMode) {
      if (!connectingFrom) {
        // First click - select source
        setConnectingFrom(component)
      } else if (connectingFrom.id !== component.id) {
        // Second click - select target and open dialog
        setPendingConnection({
          source: connectingFrom,
          target: component,
        })
        setConnectionDialogOpen(true)
      }
    }
  }

  const handleConfirmConnection = (connectionType) => {
    const newConnection = {
      id: `conn-${Date.now()}`,
      source: pendingConnection.source.id,
      target: pendingConnection.target.id,
      type: connectionType,
    }
    dispatch(addConnection(newConnection))
    setConnectingFrom(null)
    setPendingConnection({ source: null, target: null })
  }

  const handleCloseConnectionDialog = () => {
    setConnectionDialogOpen(false)
    setConnectingFrom(null)
    setPendingConnection({ source: null, target: null })
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.getElementById('editor-canvas').getBoundingClientRect()

      const x = offset.x - canvasRect.left
      const y = offset.y - canvasRect.top

      // Snap to grid (20px)
      const snappedX = Math.round(x / 20) * 20
      const snappedY = Math.round(y / 20) * 20

      const newComponent = {
        id: `${item.id}-${Date.now()}`,
        type: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        color: item.color,
        position: { x: snappedX, y: snappedY },
        state: false, // OFF by default
        width: 120,
        height: 80,
      }

      dispatch(addComponent(newComponent))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <>
      <Box
        ref={drop}
        id="editor-canvas"
        sx={{
          flexGrow: 1,
          height: '100%',
          position: 'relative',
          backgroundColor: isOver ? '#E3F2FD' : isConnectMode ? '#FFF3E0' : '#FAFAFA',
          backgroundImage: 'radial-gradient(circle, #BDBDBD 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          overflow: 'auto',
          transition: 'background-color 0.2s',
          cursor: isConnectMode ? 'crosshair' : 'default',
        }}
      >
        {/* Connection Mode Indicator */}
        {isConnectMode && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              backgroundColor: '#FF9800',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              🔗 Connect Mode: Click source component, then click target component
            </Typography>
            {connectingFrom && (
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                Selected: {connectingFrom.name} → Click target component
              </Typography>
            )}
          </Box>
        )}

        {/* Empty State */}
        {components.length === 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="text.secondary" gutterBottom>
              🎨 Your Canvas is Empty
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Drag components from the library on the left to start building your model
            </Typography>
          </Box>
        )}

        {/* Render Connections (lines) */}
        {connections.map((connection) => (
          <ConnectionLine key={connection.id} connection={connection} components={components} />
        ))}

        {/* Render Components (nodes) */}
        {components.map((component) => (
          <ComponentNode
            key={component.id}
            component={component}
            isConnectMode={isConnectMode}
            isConnecting={connectingFrom?.id === component.id}
            onComponentClick={handleComponentClick}
          />
        ))}
      </Box>

      {/* Connection Type Dialog */}
      <ConnectionDialog
        open={connectionDialogOpen}
        onClose={handleCloseConnectionDialog}
        sourceComponent={pendingConnection.source}
        targetComponent={pendingConnection.target}
        onConfirm={handleConfirmConnection}
      />
    </>
  )
}

export default EditorCanvas
