import { createTheme } from '@mui/material/styles'

// PhET and Amplify-inspired theme for middle schoolers
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3', // Bright blue - engaging for students
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4CAF50', // Green - success, activation
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#fff',
    },
    error: {
      main: '#F44336', // Red - inhibition, errors
      light: '#E57373',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FF9800', // Orange
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#00BCD4', // Cyan
      light: '#4DD0E1',
      dark: '#0097A7',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    // Larger fonts for middle school readability
    fontSize: 16, // Base font size (default is 14)
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      textTransform: 'none', // Don't uppercase buttons (more friendly)
    },
    caption: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for friendlier look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44, // Large touch targets
          minWidth: 88,
          fontSize: '1rem',
          padding: '10px 24px',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
        sizeLarge: {
          minHeight: 56,
          fontSize: '1.125rem',
          padding: '14px 32px',
        },
        sizeSmall: {
          minHeight: 36,
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.875rem', // 14px
          padding: '8px 12px',
          maxWidth: 320,
          backgroundColor: '#424242',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minHeight: 44, // Touch targets
          minWidth: 44,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 8, // Thick slider track
        },
        thumb: {
          height: 24, // Large thumb
          width: 24,
        },
        track: {
          height: 8,
        },
        rail: {
          height: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '1rem',
            minHeight: 44,
          },
        },
      },
    },
  },
  // Custom breakpoints for responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default theme
