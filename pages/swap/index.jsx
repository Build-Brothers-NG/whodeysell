import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Item from "../../src/components/swap/Item";
import SwapLayout from "../../src/components/swap/SwapLayout";
import Axios from "axios";
const Index = ({ items }) => {
  const trigger = useScrollTrigger();
  const goTop = (event) => {
    const anchor = document.querySelector("#nav-top");
    const anchor2 = document.querySelector("#nav-top2");
    if (anchor || anchor2) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      anchor2.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <>
      <Box
        sx={{
          zIndex: 1000000,
          position: "fixed",
          top: 10,
          display: trigger ? "flex" : "none",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Zoom in={trigger}>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            sx={{ borderRadius: "50px" }}
            onClick={() => goTop()}
          >
            Scroll to top
          </Button>
        </Zoom>
      </Box>
      <SwapLayout>
        {items.map((item) => {
          return (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Item item={item} />
            </Grid>
          );
        })}
      </SwapLayout>
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params, req }) => {
  // const city = req.cookies.location;
  const data = await Axios.post(
    "https://buildbrothers.com/enenu/api/swap/items"
  );
  return {
    props: {
      items: data.data.items,
    },
  };
};
