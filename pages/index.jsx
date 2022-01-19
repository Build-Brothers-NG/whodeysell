import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
const Trending = dynamic(() => import("../src/components/Trending"));
const Recent = dynamic(() => import("../src/components/Recent"));
const Slider = dynamic(() => import("../src/components/Slider"));
const All = dynamic(() => import("../src/components/All"));
const ReloadIcon = dynamic(() => import("@mui/icons-material/Replay"));

export default function Index({ data, all, message }) {
  const router = useRouter();
  const [currCat, setCurrCat] = React.useState(router.query.cat || "all");
  const trigger = useScrollTrigger({ threshold: 500 });
  const goTop = (event) => {
    const anchor = document.querySelector("#nav-top");
    const anchor2 = document.querySelector("#nav-top2");
    if (anchor || anchor2) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      anchor2.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  React.useEffect(() => {
    const temp = { ...router.query };
    temp.cat = currCat;
    if (currCat === "all") {
      delete temp.cat;
    }
    router.replace({ path: router.pathname, query: { ...temp } });
  }, [currCat]);
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
      {message ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            my: 7,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
            It seems like we could not connect to whodeysell. You can try
            reloading this page if you have an internet connection.
          </Typography>
          <Button
            onClick={() => {
              typeof window !== "undefined" && window.location.reload();
            }}
          >
            Tap to Reload <ReloadIcon />
          </Button>
        </Container>
      ) : (
        <>
          <Container sx={{ my: 2, px: { xs: "5px" } }}>
            <Stack
              className="categories"
              direction="row"
              spacing={1}
              sx={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <Chip
                onClick={() => setCurrCat("all")}
                color="primary"
                variant={currCat === "all" ? "filled" : "outlined"}
                label={"all"}
                key={"all"}
              />
              {data.cats.map((cat) => {
                return (
                  <Chip
                    onClick={() => setCurrCat(cat.cat_name)}
                    color="primary"
                    variant={currCat === cat.cat_name ? "filled" : "outlined"}
                    label={cat.cat_name}
                    key={cat.cat_name}
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
      )}
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
      `https://buildbrothers.com/enenu/api/items?city=${location}&cat=${
        context.query.cat || ""
      }`
    );
    const all = await Axios.get(
      `https://buildbrothers.com/enenu/api/search?api=true&city=${location}&cat=${
        context.query.cat || ""
      }`
    );
    // const only = all.data.items.filter((it) => it.category == "electronics");
    return {
      props: { data: res.data, all: all.data, message: false },
    };
  } catch (e) {
    return {
      props: {
        data: { items: [], recent: [], cats: [] },
        all: { items: [] },
        message: true,
      },
    };
  }
}
