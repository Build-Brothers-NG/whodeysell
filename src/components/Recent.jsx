import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import dynamic from "next/dynamic";
const Item = dynamic(() => import("./Item"));
const Recent = ({ items }) => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const [show, hide] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      hide(true);
    }
  }, []);
  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" color="text.primary">
            Recent Items
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

export default Recent;
