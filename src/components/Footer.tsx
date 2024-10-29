import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#363E4E",
        color: "white",
        p: 2,
        textAlign: "center",
        mt: "auto",
        borderTop: "1px solid lightgray",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} All rights reserved. © Easygenerator
      </Typography>
    </Box>
  );
};

export default Footer;
