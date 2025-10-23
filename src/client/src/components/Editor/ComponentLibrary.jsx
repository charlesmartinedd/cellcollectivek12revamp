import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { useDrag } from 'react-dnd'

// Component types for middle school biology
const componentCategories = [
  {
    name: 'Proteins',
    emoji: '🔵',
    color: '#2196F3',
    components: [
      { id: 'p53', name: 'p53', description: 'Tumor suppressor protein' },
      { id: 'egfr', name: 'EGFR', description: 'Growth signal receptor' },
      { id: 'insulin', name: 'Insulin', description: 'Blood sugar hormone' },
      { id: 'enzyme', name: 'Enzyme', description: 'Speed up reactions' },
    ],
  },
  {
    name: 'Genes',
    emoji: '🧬',
    color: '#4CAF50',
    components: [
      { id: 'gene1', name: 'Gene', description: 'DNA instruction' },
      { id: 'oncogene', name: 'Oncogene', description: 'Cancer-causing gene' },
      { id: 'regulator', name: 'Regulator Gene', description: 'Controls other genes' },
    ],
  },
  {
    name: 'Signals',
    emoji: '📡',
    color: '#FF9800',
    components: [
      { id: 'light', name: 'Light', description: 'Sunlight energy' },
      { id: 'hormone', name: 'Hormone Signal', description: 'Body messenger' },
      { id: 'nutrient', name: 'Nutrient', description: 'Food molecule' },
    ],
  },
  {
    name: 'Molecules',
    emoji: '⚛️',
    color: '#9C27B0',
    components: [
      { id: 'atp', name: 'ATP', description: 'Energy currency' },
      { id: 'glucose', name: 'Glucose', description: 'Sugar molecule' },
      { id: 'oxygen', name: 'Oxygen', description: 'O₂ gas' },
      { id: 'co2', name: 'CO₂', description: 'Carbon dioxide' },
    ],
  },
]

const DraggableComponent = ({ component, category }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { ...component, category: category.name, color: category.color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <Card
      ref={drag}
      sx={{
        minHeight: 80,
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: category.color + '15',
        border: `2px solid ${category.color}`,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 4,
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          {category.emoji}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {component.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {component.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const ComponentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expanded, setExpanded] = useState('Proteins') // First category expanded by default

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const filteredCategories = componentCategories.map((category) => ({
    ...category,
    components: category.components.filter((comp) =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }))

  return (
    <Box
      sx={{
        width: 280,
        height: '100%',
        backgroundColor: 'background.paper',
        borderRight: '2px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '2px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          🧬 Component Library
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Drag components onto the canvas
        </Typography>

        {/* Search */}
        <TextField
          size="small"
          fullWidth
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Component Categories */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1 }}>
        {filteredCategories.map((category) => (
          <Accordion
            key={category.name}
            expanded={expanded === category.name}
            onChange={handleAccordionChange(category.name)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ minHeight: 56 }}
            >
              <Typography variant="body1" fontWeight={600}>
                {category.emoji} {category.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ ml: 'auto', mr: 2 }}
                color="text.secondary"
              >
                {category.components.length}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {category.components.length > 0 ? (
                  category.components.map((component) => (
                    <DraggableComponent
                      key={component.id}
                      component={component}
                      category={category}
                    />
                  ))
                ) : (
                  <Typography variant="caption" color="text.secondary" sx={{ p: 2 }}>
                    No components match your search
                  </Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Help Text */}
      <Box sx={{ p: 2, borderTop: '2px solid', borderColor: 'divider', backgroundColor: '#E3F2FD' }}>
        <Typography variant="caption" color="primary.dark">
          💡 <strong>Tip:</strong> Drag any component onto the canvas to add it to your model!
        </Typography>
      </Box>
    </Box>
  )
}

export default ComponentLibrary
