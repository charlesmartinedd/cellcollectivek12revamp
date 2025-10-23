import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
} from '@mui/material'
import {
  Science as ScienceIcon,
  Home as HomeIcon,
  GridView as GridViewIcon,
  Edit as EditIcon,
  Help as HelpIcon,
} from '@mui/icons-material'

const Layout = ({ children }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar with large, clear navigation */}
      <AppBar position="sticky" elevation={2}>
        <Toolbar sx={{ minHeight: 72 }}>
          {/* Logo */}
          <ScienceIcon sx={{ fontSize: 40, mr: 2 }} />

          {/* Title */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 0, mr: 4, fontWeight: 600 }}>
            Cell Collective K-12
          </Typography>

          {/* Navigation Buttons - Large touch targets */}
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ minHeight: 44, fontSize: '1rem' }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<GridViewIcon />}
              onClick={() => navigate('/models')}
              sx={{ minHeight: 44, fontSize: '1rem' }}
            >
              Explore Models
            </Button>
            <Button
              color="inherit"
              startIcon={<EditIcon />}
              onClick={() => navigate('/editor')}
              sx={{ minHeight: 44, fontSize: '1rem' }}
            >
              Create Model
            </Button>
          </Box>

          {/* Help Button */}
          <IconButton
            color="inherit"
            size="large"
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <HelpIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" align="center">
            Cell Collective K-12 - Interactive Biology for Middle School
          </Typography>
          <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
            Grades 6-8 | Based on Cell Collective by Helikar Lab
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
