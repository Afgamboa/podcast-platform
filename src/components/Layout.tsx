import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitch'

const Layout = () => (
  <>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: '#4B5563', color: 'antiquewhite' }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
        >
          Apple top podcasts
        </Typography>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
    <Box component="main" >
      <Outlet />
    </Box>
  </>
)

export default Layout