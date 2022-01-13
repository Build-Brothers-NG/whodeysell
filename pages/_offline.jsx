import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
const Offline = () => {
  return (
    <Backdrop open={true} sx={{ bgcolor: "black", zIndex: 100000 }}>
      <Typography variant="h6">You are currently offline!!!</Typography>
    </Backdrop>
  );
};

export default Offline;
