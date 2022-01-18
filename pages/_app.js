import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/global.css";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import { useRouter } from "next/router";
import Axios from "axios";
import { getCookie } from "../src/useCookie";
import { GlobalProvider } from "../src/GlobalContext";
import * as ga from "../lib/ga";
Axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://whodeysell.com.ng/api";
Axios.defaults.withCredentials = true;
const Nav = dynamic(() => import("../src/components/Nav"));
const Footer = dynamic(() => import("../src/components/Footer"));
const Loader = dynamic(() => import("../src/components/Loader"));
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [load, setLoad] = React.useState(false);
  const router = useRouter();
  const [mode, setMode] = React.useState(props.mode);

  const myPalete = {
    dark: {
      primary: {
        main: "#479E7A",
      },
      secondary: {
        main: "#666666",
      },
      text: {
        primary: "#b3b3b3;",
        secondary: "#666666",
      },
      error: {
        main: red.A400,
      },
      white: {
        main: "#FFFFFF",
      },
      bgcolor: {
        main: "rgba(201, 199, 199, 0.13)",
      },
      typography: {
        fontFamily: ["Arima Madurai", "Raleway"].join(","),
      },
    },
    light: {
      primary: {
        main: "#479E7A",
      },
      secondary: {
        main: "#666666",
      },
      text: {
        secondary: "#b3b3b3;",
        primary: "#666666",
      },
      error: {
        main: red.A400,
      },
      white: {
        main: "#FFFFFF",
      },
      bgcolor: {
        main: "rgba(201, 199, 199, 0.13)",
      },
    },
  };
  React.useEffect(() => {
    if (!getCookie("wds_theme")) {
      setCookie("wds_theme", "dark");
    }
  }, []);

  const changeTheme = (which) => {
    setMode(which);
  };
  let theme = createTheme({
    palette: {
      mode,
      ...myPalete[mode || "dark"],
    },
  });
  theme = responsiveFontSizes(theme);
  // theming

  const loading = (data) => {
    setLoad(data);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setLoad(false);
    }
  }, []);

  React.useEffect(() => {
    const handleRoute = (url) => {
      setLoad(true);
    };

    const endRoute = (url) => {
      setLoad(false);
      ga.pageview(url);
    };

    router.events.on("routeChangeStart", handleRoute);
    router.events.on("routeChangeComplete", endRoute);
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>WhoDeySell - Find items near you</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="WhoDeySell is a people driven marketplace - find stuff near you starting with knowing how much it costs"
        />
      </Head>
      <GlobalProvider loading={loading} load={load} changeTheme={changeTheme}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Box
            sx={{
              bgcolor: theme.palette.bgcolor.main,
            }}
          >
            <CssBaseline />
            <Nav />
            <Component {...pageProps} />
            <Footer />
            <Backdrop
              open={load}
              sx={{ color: "rgba(0, 0, 0, 0.7)", zIndex: 100000 }}
            >
              <Loader />
            </Backdrop>
          </Box>
        </ThemeProvider>
      </GlobalProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
