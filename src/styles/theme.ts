import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: { main: '#fcf4eb' },
    secondary: { main: '#F50057' },
    background: {
      default: '#1f1d35',
      paper: '#5c4b63',
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