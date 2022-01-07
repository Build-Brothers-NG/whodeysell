import React from "react";
import {
  Box,
  Grid,
  Container,
  Avatar,
  Typography,
  Stack,
  Button,
  IconButton,
  SpeedDial,
  Backdrop,
  Snackbar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Axios from "axios";
import Link from "next/link";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Head from "next/head";
import { useRouter } from "next/router";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/CloseSharp";
import {
  Facebook,
  Twitter,
  Reddit,
  Whatsapp,
  Copy,
  CleanURL,
} from "simple-sharer";
import { getCookie } from "../../../../src/useCookie";
import { GlobalContext } from "../../../../src/GlobalContext";
const Detail = ({ item: { item } }) => {
  const router = useRouter();
  const { user } = React.useContext(GlobalContext);
  const [time, setTime] = React.useState();
  const [showImage, setShowImage] = React.useState(false);
  const [snack, setSnack] = React.useState(false);
  const actions = [
    { icon: <FacebookIcon />, text: "Share on Facebook", func: Facebook },
    { icon: <TwitterIcon />, text: "Share on Twitter", func: Twitter },
    { icon: <WhatsAppIcon />, text: "Share on Whatsapp", func: Whatsapp },
    { icon: <RedditIcon />, text: "Share on Reddit", func: Reddit },
    { icon: <LinkIcon />, text: "Copy Link", func: Copy },
  ];

  const timing = (first) => {
    let then = new Date(first).getTime();
    let today = new Date().getTime();
    let milliseconds = today - 3600000 - then;
    let week = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 7));
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor(milliseconds / (1000 * 60));
    let seconds = Math.floor(milliseconds / 1000);
    if (week >= 1) {
      setTime(new Date(first).toString().substring(0, 15));
    } else if (days >= 1) {
      setTime(days === 1 ? "A day ago" : `${days} days ago`);
    } else if (hours >= 1) {
      setTime(hours === 1 ? "An hour ago" : `${hours} hours ago`);
    } else if (minutes >= 1) {
      setTime(minutes === 1 ? "A minute ago" : `${minutes} minutes ago`);
    } else if (seconds >= 1) {
      if (seconds < 30) {
        setTime("Just now");
      } else {
        setTime(`${seconds} seconds ago`);
      }
    } else {
      setTime("Just now");
    }
  };
  React.useEffect(() => {
    timing(item.created_at);
  }, []);
  return (
    <>
      <Head>
        <title>
          {`${item.itemName} in ${item.city} for swap |
          Whodeysell`}
        </title>
        <meta
          name="description"
          content={`${item.itemName} For swap in ${item.city}, ${item.itemDescription}`}
        />
        <meta
          property="og:url"
          content={`https://whodeysell.com.ng${router.asPath}`}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={`${item.itemName} in ${item.city}`}
        />
        <meta
          property="og:description"
          content={`${item.itemName} For swap in ${item.city}, ${item.itemDescription}`}
        />
        <meta
          property="og:image"
          content={
            item.photo === ""
              ? "/temp.jpg"
              : `https://buildbrothers.com/enenu/images/${item.photo}`
          }
        />
      </Head>
      <Container>
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Link href={`/user/${CleanURL(`${item.name}/${item.userId}`)}`}>
                <a>
                  <Avatar color="text.primary" sx={{ width: 56, height: 56 }}>
                    {item.name[0].toUpperCase()}
                  </Avatar>
                </a>
              </Link>
              <Stack sx={{ mx: 1 }}>
                <Link href={`/user/${CleanURL(`${item.name}/${item.userId}`)}`}>
                  <a>
                    <Typography variant="h6" sx={{ pb: 0 }}>
                      {item.name}
                    </Typography>
                  </a>
                </Link>
                <Typography variant="span" color="secondary">
                  {time}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "fit-content",
                  width: "100%",
                  position: "relative",
                  "&:hover": {
                    ".view-image": {
                      display: "flex !important",
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={
                    item.photo === ""
                      ? "/temp.jpg"
                      : `https://buildbrothers.com/enenu/images/${item.photo}`
                  }
                  sx={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "400px",
                    objectFit: "cover !important",
                  }}
                />
                <Box
                  className="view-image"
                  sx={{
                    width: "100%",
                    height: "400px",
                    display: "none",
                    bgcolor: "rgba(0, 0, 0, 0.9)",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <Button
                    color="white"
                    variant="outlined"
                    onClick={() => setShowImage(true)}
                  >
                    Click to view photo
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { md: "center" },
                }}
              >
                <Button
                  disableElevation
                  variant="outlined"
                  sx={{
                    borderRadius: "40px",
                    mr: 2,
                    py: 1,
                    width: { xs: "100%", md: "50%" },
                    height: "fit-content",
                  }}
                >
                  {item.hits} Seen this.
                </Button>
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ my: { xs: 1, md: 0 }, width: "fit-content" }}
                  FabProps={{ size: "small" }}
                  icon={<ShareIcon />}
                  direction="right"
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      onClick={() => action.func()}
                      key={action.text}
                      icon={action.icon}
                      tooltipTitle={action.text}
                    />
                  ))}
                </SpeedDial>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                ".MuiTypography-root": {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <Stack>
                <Typography variant="span" color="secondary">
                  Name
                </Typography>
                <Typography variant="h6">{item.itemName}</Typography>
                <Typography variant="span" color="secondary">
                  Price
                </Typography>
                <Typography variant="h6">
                  {item.item_price == 0 ? (
                    "Free"
                  ) : (
                    <>₦{item.item_price.toLocaleString()}</>
                  )}
                </Typography>
                <Typography
                  variant="span"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Contact <PhoneIcon color="primary" />
                </Typography>
                <Typography variant="h6">{item.phone_number}</Typography>
                <Typography variant="span" color="secondary">
                  City
                  <Box component="img" src="/map.svg" sx={{ width: "20px" }} />
                </Typography>
                <Typography variant="h6">
                  {item.city[0].toUpperCase() +
                    item.city.substring(1, item.city.length)}
                </Typography>
                <Typography variant="span" color="secondary">
                  Description
                </Typography>
                <Typography variant="h6">{item.itemDescription}</Typography>
              </Stack>
            </Grid>
            {/* <Grid item xs={12}>
              <Suggestion items={suggestions} />
            </Grid> */}
          </Grid>
        </Box>
        <Backdrop
          open={showImage}
          sx={{ zIndex: 10000 }}
          onClick={() => setShowImage(false)}
        >
          <Container maxWidth="sm" sx={{ overflowY: "auto" }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "fit-content", md: "90vh" },
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 0, left: 0 }}
                onClick={() => setShowImage(false)}
              >
                <CloseIcon color="white" />
              </IconButton>
              <Box
                component="img"
                src={
                  item.photo === ""
                    ? "/temp.jpg"
                    : `https://buildbrothers.com/enenu/images/${item.photo}`
                }
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "fit-content",
                  objectFit: "cover !important",
                }}
              />
            </Box>
          </Container>
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={snack}
          autoHideDuration={4000}
          onClose={() => setSnack(false)}
          message={"You have to login to add Kudos"}
        />
      </Container>
    </>
  );
};

export default Detail;

export async function getServerSideProps({ params, req }) {
  if (req.cookies.wds_user) {
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${JSON.parse(req.cookies.wds_user).token}`,
    };
  }
  const res = await Axios.post(
    `https://buildbrothers.com/enenu/api/swap/item/${params.id}`
  );
  return {
    props: { item: res.data },
  };
}
