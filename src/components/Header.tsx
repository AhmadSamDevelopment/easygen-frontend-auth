// src/components/Header.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";

const headerTheme = createTheme(theme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderBottom: "3px solid #C1C2C6",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "10px 0",
        },
      },
    },
  },
});

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "center", padding: "0 20px" }}>
          <img
            src="https://assets.easygenerator.com/fragment/auth-page/2024.09.20.master-1580d78a0f/fe2d0604cd7c37cb56fba71cae72c2e6.svg"
            alt="Logo"
            style={{
              maxHeight: "50px",
              maxWidth: "85px",
              marginRight: "20px",
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Course Platform
          </Typography>

          <Box sx={{ minWidth: "100px", display: 'flex', justifyContent: 'flex-end' }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div style={{ minWidth: "100px" }} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
