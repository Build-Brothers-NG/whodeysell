import React, { useEffect } from "react";
import { Box, IconButton, Backdrop } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import { Slide1, Slide2 } from "./elements/Slides";
SwiperCore.use([Navigation, Autoplay, Pagination]);

const Slider = () => {
  const [show, hide] = React.useState(true);
  useEffect(() => {
    setTimeout(() => hide(false), 2000);
  }, []);
  return (
    <Box
      sx={{
        ".mySwiper": {
          height: { xs: "70vw", sm: "30vw" },
          position: "relative",
          bgcolor: "transparent !important",
        },
        ".slide": {
          bgcolor: "transparent !important",
        },
      }}
    >
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <Box
          sx={{
            position: "absolute",
            display: show ? "flex" : "none",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "white.main",
            zIndex: 1000,
          }}
        ></Box>
        <SwiperSlide className="slide">
          <Slide1 />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <Slide2 />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Slider;
