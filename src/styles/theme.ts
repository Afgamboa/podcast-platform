import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: { main: '#fcf4eb' },
    secondary: { main: '#F50057' },
    background: {
      default: '#1F2937',
      paper: '#4B5563',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6C6C80',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 8,
  },
})