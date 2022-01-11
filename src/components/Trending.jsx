import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Item from "./Item";
import SwiperCore, { Navigation, Autoplay } from "swiper";
SwiperCore.use([Navigation, Autoplay]);

const Trending = ({ items }) => {
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
      <Typography variant="h5" color="secondary" sx={{ my: "5px" }}>
        Trending Items
      </Typography>
      {items.length === 0 && (
        <Typography
          variant="h5"
          color="secondary"
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

export default Trending;
