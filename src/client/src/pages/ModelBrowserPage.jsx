import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

// Placeholder - will be replaced with actual models
const placeholderModels = [
  {
    id: 1,
    name: 'Photosynthesis',
    emoji: '🌿',
    category: 'Cell Processes',
    difficulty: 'Beginner',
    description: 'Learn how plants make food from sunlight!',
  },
  {
    id: 2,
    name: 'Cell Division',
    emoji: '🔬',
    category: 'Cell Processes',
    difficulty: 'Medium',
    description: 'Discover how cells grow and divide.',
  },
  {
    id: 3,
    name: 'Immune Response',
    emoji: '🦠',
    category: 'Human Biology',
    difficulty: 'Medium',
    description: 'See how your body fights off infections!',
  },
  {
    id: 4,
    name: 'DNA Replication',
    emoji: '🧬',
    category: 'Genetics',
    difficulty: 'Advanced',
    description: 'Watch DNA copy itself in the cell.',
  },
]

const difficultyColors = {
  'Beginner': 'success',
  'Medium': 'warning',
  'Advanced': 'error',
}

const ModelBrowserPage = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        🧬 Explore Biology Models
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, fontSize: '1.125rem' }}>
        Choose a model to explore. Click "Learn More" to read about it, or "Run Simulation" to see it in action!
      </Typography>

      <Grid container spacing={4}>
        {placeholderModels.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: 80, mb: 2 }}>
                  {model.emoji}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                  {model.name}
                </Typography>
                <Chip
                  label={model.difficulty}
                  color={difficultyColors[model.difficulty]}
                  sx={{ mb: 2, fontSize: '0.875rem' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }}>
                  {model.description}
                </Typography>
                <Chip
                  label={model.category}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', gap: 1, pb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<InfoIcon />}
                  sx={{ minHeight: 44 }}
                >
                  Learn More
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PlayIcon />}
                  sx={{ minHeight: 44 }}
                >
                  Run Simulation
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Placeholder notice */}
      <Box sx={{ mt: 6, p: 3, backgroundColor: '#FFF3E0', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          📝 Coming Soon: 20 Interactive Models!
        </Typography>
        <Typography variant="body1">
          We're currently curating and simplifying 20 biology models from Cell Collective.
          Each model will include interactive tutorials, quizzes, and clear visualizations designed
          specifically for grades 6-8.
        </Typography>
      </Box>
    </Box>
  )
}

export default ModelBrowserPage
