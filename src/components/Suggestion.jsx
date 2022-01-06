import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Item from "./Item";

const Suggestion = ({ items }) => {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h5" color="secondary">
              Other Items from the same city
            </Typography>
          </Grid>
          {items.map((item, index) => {
            return (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <Item item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Suggestion;
