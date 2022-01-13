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
    <>
      <Typography variant="h5" color="text.primary" sx={{ my: "5px" }}>
        Recent Items
      </Typography>
      {items.length === 0 && (
        <Typography
          variant="h5"
          color="text.primary"
          sx={{ my: "5px", textAlign: "center" }}
        >
          No items from this location
        </Typography>
      )}
      {show && (
        <Box>
          <Swiper
            slidesPerView={md ? 4 : sm ? 3 : 2}
            spaceBetween={sm ? 20 : 10}
            navigation={true}
            className="mySwiper"
          >
            {items.map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <Box sx={{ my: "5px" }}>
                    <Item item={item} />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default Recent;
