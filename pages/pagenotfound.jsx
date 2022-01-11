import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const PageNotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        <Box
          component="img"
          src="/404.svg"
          sx={{ width: "60%", height: "auto" }}
        />
        <Typography variant="p" sx={{ textAlign: "center", my: 2 }}>
          This page was not found
        </Typography>

        <Link href="/">
          <a>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Go back home
            </Typography>
          </a>
        </Link>
      </Box>
    </Container>
  );
};

export default PageNotFound;
