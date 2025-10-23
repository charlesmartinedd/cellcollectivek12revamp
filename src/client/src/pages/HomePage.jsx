import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material'
import {
  Science as ScienceIcon,
  PlayArrow as PlayIcon,
  Create as CreateIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
} from '@mui/icons-material'

const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <ScienceIcon sx={{ fontSize: 60 }} />,
      title: 'Explore 20 Biology Models',
      description: 'Interactive simulations of cells, genes, and biological processes designed for middle school students.',
      action: 'Browse Models',
      onClick: () => navigate('/models'),
      color: '#2196F3',
    },
    {
      icon: <PlayIcon sx={{ fontSize: 60 }} />,
      title: 'Run Simulations',
      description: 'Watch biological processes unfold in real-time with clear graphs and visualizations.',
      action: 'Try a Simulation',
      onClick: () => navigate('/models'),
      color: '#4CAF50',
    },
    {
      icon: <CreateIcon sx={{ fontSize: 60 }} />,
      title: 'Create Your Own Models',
      description: 'Build and test your own biological models with our easy-to-use drag-and-drop editor.',
      action: 'Open Editor',
      onClick: () => navigate('/editor'),
      color: '#FF9800',
    },
    {
      icon: <QuizIcon sx={{ fontSize: 60 }} />,
      title: 'Take Quizzes',
      description: 'Test your knowledge with built-in quizzes for each model and get instant feedback.',
      action: 'Start Learning',
      onClick: () => navigate('/models'),
      color: '#9C27B0',
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #2196F3 0%, #4CAF50 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 6,
        }}
      >
        <ScienceIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
          Welcome to Cell Collective K-12!
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Explore the amazing world of biology through interactive simulations designed just for you.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<SchoolIcon />}
          onClick={() => navigate('/models')}
          sx={{
            fontSize: '1.25rem',
            py: 2,
            px: 4,
            backgroundColor: 'white',
            color: '#2196F3',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Start Exploring
        </Button>
      </Box>

      {/* Features Grid */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
        What You Can Do
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                <Box sx={{ color: feature.color, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={feature.onClick}
                  sx={{
                    backgroundColor: feature.color,
                    minHeight: 44,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: feature.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  {feature.action}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Info Section */}
      <Box sx={{ mt: 8, p: 4, backgroundColor: '#E3F2FD', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Designed for Grades 6-8
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto', fontSize: '1.125rem' }}>
          Cell Collective K-12 is based on the research platform used by scientists, but redesigned
          specifically for middle school students. Large buttons, clear graphs, and step-by-step
          tutorials make learning biology interactive and fun!
        </Typography>
      </Box>
    </Box>
  )
}

export default HomePage
