import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Paper } from '@mui/material'
import { useDrop } from 'react-dnd'
import { addComponent } from '../../store/slices/editorSlice'
import ComponentNode from './ComponentNode'
import ConnectionLine from './ConnectionLine'

const EditorCanvas = () => {
  const dispatch = useDispatch()
  const { components, connections } = useSelector((state) => state.editor)

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
    <Box
      ref={drop}
      id="editor-canvas"
      sx={{
        flexGrow: 1,
        height: '100%',
        position: 'relative',
        backgroundColor: isOver ? '#E3F2FD' : '#FAFAFA',
        backgroundImage: 'radial-gradient(circle, #BDBDBD 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        overflow: 'auto',
        transition: 'background-color 0.2s',
      }}
    >
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
        <ComponentNode key={component.id} component={component} />
      ))}
    </Box>
  )
}

export default EditorCanvas
