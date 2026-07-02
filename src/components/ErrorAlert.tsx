import { Box, Alert, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface IErrorAlertProps {
  message?: string
  onRetry?: () => void
}

const ErrorAlert = ({ message, onRetry }: IErrorAlertProps) => {
  const { t } = useTranslation()

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh"
    }}
    >
      <Alert
        severity="error"
        sx={{
          width: '100%',
          maxWidth: 520,
          py: 3,
          px: 4,
          fontSize: '1rem',
          alignItems: 'center',
          '& .MuiAlert-icon': { fontSize: '2rem' },
        }}
        action={
          onRetry ? (
            <Button color="inherit" size="medium" onClick={onRetry} sx={{ fontWeight: 700 }}>
              {t('home.retry')}
            </Button>
          ) : undefined
        }
      >
        <Typography variant="body1" >
          {message ?? t('home.errorMessage')}
        </Typography>
      </Alert>
    </Box>
  )
}

export default ErrorAlert