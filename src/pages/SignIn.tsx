import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthForm from "../components/AuthForm";
import theme from "../theme";
import { API_BASE_URL, SIGN_IN_PATH } from "../constants";
import { useAuth } from "../context/AuthContext";
import useSnackbar from "../context/useSnackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const signInTheme = createTheme(theme, {
  palette: {
    primary: {
      main: "#4D89FD", 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4D89FD",
            },
            "&:hover fieldset": {
              borderColor: "#4D89FD",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4D89FD",
            },
          },
        },
      },
    },
  },
});

const SignIn: React.FC = () => {
  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleSnackbarClose,
  } = useSnackbar();
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSignIn = async (values: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${SIGN_IN_PATH}`, {
        email: values.email,
        password: values.password,
      });
      const token = response.data.access_token;

      login(token); 

      showSnackbar("Sign in successful!", "success");
      navigate("/app");
    } catch (error: any) {
      console.error("Error signing in:", error);
      if (error.response && error.response.status === 401) {
        showSnackbar("Invalid email or password!", "error");
      } else {
        showSnackbar("Error during sign in!", "error");
      }
    }
  };

  return (
    <ThemeProvider theme={signInTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 3,
          bgcolor: "white",
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2, 
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Welcome Back!
        </Typography>

        <AuthForm onSubmit={handleSignIn} isSignUp={false} />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
