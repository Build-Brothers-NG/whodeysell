import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Item from "../../src/components/swap/Item";
import SwapLayout from "../../src/components/swap/SwapLayout";
import Axios from "axios";
const Index = ({ items }) => {
  console.log(items);
  return (
    <SwapLayout>
      {items.map((item) => {
        return (
          <Grid key={item.id} item xs={6} sm={4} md={3}>
            <Item item={item} />
          </Grid>
        );
      })}
    </SwapLayout>
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
