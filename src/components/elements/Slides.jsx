import React from "react";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import Link from "next/link";
export const Slide1 = () => {
  return (
    <Container sx={{ px: { xs: 0 }, bgcolor: "transparent !important" }}>
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
            <Typography variant="h4" sx={{ my: 1 }}>
              Welcome to Whodeysell (WDS)
            </Typography>
            <Typography variant="p" sx={{ mx: "40px", fontSize: "1.2rem" }}>
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
            <Box
              component="img"
              src="/slide1.svg"
              sx={{ width: "100%", my: 3 }}
            />
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
              <Typography variant="h5">Welcome to Whodeysell (WDS)</Typography>
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

export const Slide2 = () => {
  return (
    <Container sx={{ px: { xs: 0 }, bgcolor: "transparent !important" }}>
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
            <Typography variant="h4" sx={{ my: 1 }}>
              Swap Your items
            </Typography>
            <Typography
              variant="p"
              sx={{ mx: "40px", fontSize: "1.2rem", my: 1 }}
            >
              With Whodeysell Swap-It, you can swap your items on the platform
              with money or other items as well
            </Typography>
            <Link href="/swap">
              <a>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: "40px",
                    width: "fit-content",
                    m: "auto",
                    my: 1,
                  }}
                >
                  Click here to swap your items
                </Button>
              </a>
            </Link>
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
            <Box
              component="img"
              src="/swapslide.svg"
              sx={{ width: "90%", my: 3 }}
            />
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
              <Typography variant="h5">Swap Your items</Typography>
              <Typography variant="p">
                With Whodeysell Swap-It, you can swap your items on the platform
                with money or other items as well
              </Typography>
              <Link href="/swap">
                <a>
                  <Button
                    disableElevation
                    variant="contained"
                    // color=""
                    sx={{
                      borderRadius: "40px",
                      width: "fit-content",
                      m: "auto",
                    }}
                  >
                    Click here to swap your items
                  </Button>
                </a>
              </Link>
            </Box>
            <Box sx={{ bgcolor: "white.main" }}>
              <Box
                component="img"
                src="/swapslide.svg"
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};
