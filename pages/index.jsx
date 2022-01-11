import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Axios from "axios";
import dynamic from "next/dynamic";
const Trending = dynamic(() => import("../src/components/Trending"));
const Recent = dynamic(() => import("../src/components/Recent"));
const Slider = dynamic(() => import("../src/components/Slider"));
const All = dynamic(() => import("../src/components/All"));

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
  const trigger = useScrollTrigger({ threshold: 500 });
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
                onClick={() => setCurrCat(cat)}
                color="primary"
                variant={currCat === cat ? "filled" : "outlined"}
                label={cat}
                key={cat}
                // clickable
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
