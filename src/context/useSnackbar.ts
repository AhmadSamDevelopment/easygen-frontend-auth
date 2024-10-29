import { useState, useCallback } from "react";
import { AlertProps } from "@mui/material/Alert";

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertProps["severity"]>("success");

  const showSnackbar = useCallback(
    (message: string, severity: AlertProps["severity"]) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
    []
  );

  const handleSnackbarClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    },
    []
  );

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleSnackbarClose,
  };
};

export default useSnackbar;
