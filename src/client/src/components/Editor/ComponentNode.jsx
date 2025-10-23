import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import {
  Delete as DeleteIcon,
  PowerSettingsNew as PowerIcon,
} from '@mui/icons-material'
import { useDrag } from 'react-dnd'
import {
  updateComponent,
  removeComponent,
  selectComponent,
} from '../../store/slices/editorSlice'

const ComponentNode = ({ component }) => {
  const dispatch = useDispatch()
  const { selectedComponent } = useSelector((state) => state.editor)
  const nodeRef = useRef(null)

  const isSelected = selectedComponent?.id === component.id

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT_NODE',
    item: { id: component.id, position: component.position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset()
      if (offset) {
        const canvasRect = document.getElementById('editor-canvas').getBoundingClientRect()
        const x = offset.x - canvasRect.left - component.width / 2
        const y = offset.y - canvasRect.top - component.height / 2

        // Snap to grid
        const snappedX = Math.round(x / 20) * 20
        const snappedY = Math.round(y / 20) * 20

        dispatch(
          updateComponent({
            id: component.id,
            position: { x: snappedX, y: snappedY },
          })
        )
      }
    },
  }))

  drag(nodeRef)

  const handleClick = (e) => {
    e.stopPropagation()
    dispatch(selectComponent(component))
  }

  const handleToggleState = (e) => {
    e.stopPropagation()
    dispatch(
      updateComponent({
        id: component.id,
        state: !component.state,
      })
    )
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(removeComponent(component.id))
  }

  return (
    <Paper
      ref={nodeRef}
      onClick={handleClick}
      elevation={isSelected ? 8 : 2}
      sx={{
        position: 'absolute',
        left: component.position.x,
        top: component.position.y,
        width: component.width,
        minHeight: component.height,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        border: isSelected ? `3px solid ${component.color}` : `2px solid ${component.color}`,
        borderRadius: 2,
        backgroundColor: component.state ? `${component.color}20` : '#fff',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ p: 1.5 }}>
        {/* Header with state toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <IconButton
            size="small"
            onClick={handleToggleState}
            sx={{
              backgroundColor: component.state ? '#4CAF50' : '#9E9E9E',
              color: 'white',
              '&:hover': {
                backgroundColor: component.state ? '#45A049' : '#757575',
              },
              minWidth: 32,
              minHeight: 32,
            }}
          >
            <PowerIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{ minWidth: 32, minHeight: 32 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Component Name */}
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            fontSize: '1rem',
            textAlign: 'center',
            color: component.state ? component.color : 'text.primary',
          }}
        >
          {component.name}
        </Typography>

        {/* State Label */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: component.state ? '#4CAF50' : '#9E9E9E',
            fontWeight: 600,
            mt: 0.5,
          }}
        >
          {component.state ? 'ON' : 'OFF'}
        </Typography>
      </Box>
    </Paper>
  )
}

export default ComponentNode
