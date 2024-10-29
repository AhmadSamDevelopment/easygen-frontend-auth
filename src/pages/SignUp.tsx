import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import AuthForm from "../components/AuthForm";
import useSnackbar from "../context/useSnackbar";
import theme from "../theme";
import { API_BASE_URL, SIGN_UP_PATH } from "../constants";
import { useAuth } from "../context/AuthContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleSnackbarClose,
  } = useSnackbar();
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (values: SignUpValues) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${SIGN_UP_PATH}`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      login(response.data.access_token);
      showSnackbar("Sign up successful!", "success");
      navigate("/app");
    } catch (error: any) {
      console.error("Error signing up:", error);
      if (error.response && error.response.status === 409) {
        showSnackbar("Email already registered!", "error");
      } else {
        showSnackbar("Error during sign up!", "error");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 3,
          bgcolor: "background.paper",
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
   <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Welcome!
        </Typography>

        <AuthForm onSubmit={handleSignUp} />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%", color: "white", bgcolor: "primary.main" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
