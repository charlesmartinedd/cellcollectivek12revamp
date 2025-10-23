import React from 'react'
import { Box } from '@mui/material'

const ConnectionLine = ({ connection, components }) => {
  const sourceComponent = components.find((c) => c.id === connection.source)
  const targetComponent = components.find((c) => c.id === connection.target)

  if (!sourceComponent || !targetComponent) return null

  const sourceX = sourceComponent.position.x + sourceComponent.width / 2
  const sourceY = sourceComponent.position.y + sourceComponent.height / 2
  const targetX = targetComponent.position.x + targetComponent.width / 2
  const targetY = targetComponent.position.y + targetComponent.height / 2

  const color = connection.type === 'activation' ? '#4CAF50' : '#F44336'

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${connection.type}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>
        <marker
          id={`inhibition-${connection.type}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6" stroke={color} strokeWidth="2" />
        </marker>
      </defs>
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        stroke={color}
        strokeWidth="3"
        markerEnd={
          connection.type === 'activation'
            ? `url(#arrowhead-${connection.type})`
            : `url(#inhibition-${connection.type})`
        }
      />
    </svg>
  )
}

export default ConnectionLine
