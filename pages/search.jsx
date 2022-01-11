import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import React from "react";
import Axios from "axios";
import Item from "../src/components/Item";
import { useRouter } from "next/router";
const Search = (props) => {
  const { items } = props.items;
  const router = useRouter();
  return (
    <Container>
      <Box sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Showing results for {router.query.q} in{" "}
              {router.query.city || "All Cities"}
            </Typography>
          </Grid>
          {items.map((item) => {
            return (
              <Grid key={item.id} item sx={6} sm={4} md={3}>
                <Item item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const res = await Axios.get(
    `https://buildbrothers.com/enenu/api/search?q=${query.q}&api=true&city=${query.city}`
  );
  return {
    props: { items: res.data }, // will be passed to the page component as props
  };
}
