import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
export const Slide1 = () => {
  return (
    <Container sx={{ px: { xs: 0 } }}>
      <Box sx={{ width: "100%", height: "500px" }}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Box
            component={Grid}
            item
            xs={12}
            md={6}
            sx={{
              textAlign: "center !important",
              display: {
                xs: "none",
                md: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Typography variant="h4" sx={{ color: "black !important" }}>
              Welcome to Whodeysell (WDS)
            </Typography>
            <Typography
              variant="p"
              sx={{ mx: "40px", fontSize: "1.2rem", color: "black !important" }}
            >
              This is Who Dey Sell (WDS) WDS is a people driven marketplace -
              find stuff near you starting with knowing how much it costs
            </Typography>
          </Box>
          <Box
            component={Grid}
            item
            xs={12}
            md={6}
            sx={{
              textAlign: "center !important",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box component="img" src="/slide1.png" sx={{ width: "100%" }} />
          </Box>
          <Box
            component={Grid}
            item
            xs={12}
            sx={{
              textAlign: "center !important",
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white !important",
                pl: "5px",
              }}
            >
              <Typography variant="h6">Welcome to Whodeysell (WDS)</Typography>
              <Typography variant="p">
                This is Who Dey Sell (WDS) WDS is a people driven marketplace -
                find stuff near you starting with knowing how much it costs
              </Typography>
            </Box>
            <Box component="img" src="/slide1.png" sx={{ width: "100%" }} />
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};
