import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Application from "./pages/Application";
import AuthGuard from "./components/AuthGuard";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              bgcolor: "white",
            }}
          >
            <Header />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              <Routes>
                <Route
                  path="/signup"
                  element={<AuthRedirect to="/app" component={<SignUp />} />}
                />
                <Route
                  path="/signin"
                  element={<AuthRedirect to="/app" component={<SignIn />} />}
                />
                <Route
                  path="/app"
                  element={
                    <AuthGuard>
                      <Application />
                    </AuthGuard>
                  }
                />
                <Route path="/" element={<Navigate to="/signin" />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

const AuthRedirect = ({
  to,
  component,
}: {
  to: string;
  component: JSX.Element;
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={to} /> : component;
};

export default App;
