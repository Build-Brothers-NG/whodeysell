import React from "react";
import { Box, Container, Grid } from "@mui/material";
import SideBar from "./SideBar";
const SwapLayout = ({ children }) => {
  return (
    <Container sx={{ px: { xs: "5px" } }}>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SideBar />
          </Grid>
          <Grid container item xs={12} md={9} spacing={1}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SwapLayout;
