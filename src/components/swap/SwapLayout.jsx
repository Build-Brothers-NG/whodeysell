import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
const SideBar = dynamic(() => import("./SideBar"));
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
