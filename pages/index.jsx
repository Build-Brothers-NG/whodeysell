import * as React from "react";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import Slider from "../src/components/Slider";
import Recent from "../src/components/Recent";
import Trending from "../src/components/Trending";
import All from "../src/components/All";
import Axios from "axios";
const categories = [
  "all",
  "food stuffs",
  "fruits",
  "vegetables",
  "electronics",
  "phones",
  "laptops",
  "farm produce",
];

export default function Index({ data, all }) {
  const [currCat, setCurrCat] = React.useState("all");

  return (
    <>
      <Box sx={{ bgcolor: "background.default" }}>
        <Slider />
      </Box>
      <Container sx={{ my: 2, px: { xs: "5px" } }}>
        <Stack
          className="categories"
          direction="row"
          spacing={1}
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
          {categories.map((cat) => {
            return (
              <Chip
                color="primary"
                variant={currCat === cat ? "filled" : "outlined"}
                label={cat}
                key={cat}
                clickable
              />
            );
          })}
        </Stack>
      </Container>
      <Container sx={{ px: { xs: "5px" } }}>
        <Trending items={data.items} />
      </Container>
      <Container sx={{ px: { xs: "5px" } }}>
        <Recent items={data.recent} />
      </Container>
      <Container sx={{ px: { xs: "5px" } }}>
        <All items={all.items} />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let location = context.req.cookies.wds_location || "";
    location = location
      ? JSON.parse(context.req.cookies.wds_location).location
      : location;
    location = location === "all" ? "" : location;
    const res = await Axios.post(
      `https://buildbrothers.com/enenu/api/items?city=${location}`
    );
    const all = await Axios.get(
      `https://buildbrothers.com/enenu/api/search?api=true&city=${location}`
    );
    return {
      props: { data: res.data, all: all.data }, // will be passed to the page component as props
    };
  } catch (e) {
    return {
      props: { data: { items: [], recent: [] }, all: { items: [] } },
    };
  }
}
