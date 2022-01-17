import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
const Item = dynamic(() => import("./Item"));
const All = ({ items }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.primary">
            All Items
          </Typography>
        </Grid>
        {items.length === 0 && (
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ my: "5px", textAlign: "center" }}
            >
              No items from this location or category
            </Typography>
          </Grid>
        )}
        {items.map((item, index) => {
          return (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Item item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default All;
