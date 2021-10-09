import { createTheme } from '@mui/material/styles';

//createTheme is used here so VSCode can give suggestions
export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1565c0'
    },
    secondary: {
      main: '#73eedc',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          display: 'block',
          margin: '16px'
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: '2px 16px'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '16px 16px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: '5px',
          backgroundColor: '#333'
        }
      }
    }
  }
});

