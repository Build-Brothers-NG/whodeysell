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
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactPlayer from "react-player/youtube";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/CloseSharp";
import { GlobalContext } from "../src/GlobalContext";
const Trending = dynamic(() => import("../src/components/Trending"));
const Recent = dynamic(() => import("../src/components/Recent"));
const Slider = dynamic(() => import("../src/components/Slider"));
const All = dynamic(() => import("../src/components/All"));
const ReloadIcon = dynamic(() => import("@mui/icons-material/Replay"));
import { setCookie } from "../src/useCookie";
export default function Index({ data, all, message, firstTime }) {
  const router = useRouter();
  const [currCat, setCurrCat] = React.useState(router.query.cat || "all");
  const trigger = useScrollTrigger({ threshold: 500 });
  const { video, showVideo } = React.useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const goTop = (event) => {
    const anchor = document.querySelector("#nav-top");
    const anchor2 = document.querySelector("#nav-top2");
    if (anchor || anchor2) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      anchor2.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  React.useEffect(() => {
    if (firstTime === true) {
      setTimeout(() => {
        setOpen(true);
        setCookie("wds_location", { location: "all" });
      }, 2000);
    }
  }, []);
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title">
          WhoDeySell - How It Works
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">
              Hi, it seems this is your first time visiting WhoDeySell, would you
              like to watch a video on how WhoDeySell Works?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button
            onClick={() => {
              setOpen(false);
              showVideo(true);
            }}
          >
            Sure
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={video} sx={{ zIndex: 10000 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ReactPlayer
              playing={video}
              style={{ width: "fit-content" }}
              controls={true}
              url="https://www.youtube.com/watch?v=DkpEiobaPv8"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={() => showVideo(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Container>
      </Backdrop>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let location = context.req.cookies.wds_location || "";
    location = location
      ? JSON.parse(context.req.cookies.wds_location).location
      : location;
    const firstTime = !location;
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
      props: {
        data: res.data,
        all: all.data,
        message: false,
        firstTime,
      },
    };
  } catch (e) {
    let location = context.req.cookies.wds_location || "";
    location = location
      ? JSON.parse(context.req.cookies.wds_location).location
      : location;
    const firstTime = !location;
    return {
      props: {
        data: { items: [], recent: [], cats: [] },
        all: { items: [] },
        message: true,
        firstTime,
      },
    };
  }
}
