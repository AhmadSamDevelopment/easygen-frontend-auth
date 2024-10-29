
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#64C47C',
    },
  },
  typography: {
    fontFamily: 'Qanelas Soft, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '30px',
            },
            '&:hover fieldset': {
              borderColor: '#2cbda9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2cbda9',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: '30px',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;