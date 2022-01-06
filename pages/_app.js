import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
// import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Nav from "../src/components/Nav";
import "../styles/global.css";
import Footer from "../src/components/Footer";
import { Backdrop, Box } from "@mui/material";
import { useRouter } from "next/router";
import Loader from "../src/components/Loader";
import Axios from "axios";
import { getCookie } from "../src/useCookie";
import { GlobalContext, GlobalProvider } from "../src/GlobalContext";
Axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://whodeysell.com.ng/api";
Axios.defaults.withCredentials = true;

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
  const theme = createTheme({
    palette: {
      mode,
      ...myPalete[mode || "dark"],
    },
  });
  // theming

  const loading = (data) => {
    setLoad(data);
  };
  React.useEffect(() => {
    const handleRoute = (url) => {
      setLoad(true);
    };

    const endRoute = (url) => {
      setLoad(false);
    };

    router.events.on("routeChangeStart", handleRoute);
    router.events.on("routeChangeComplete", endRoute);
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Whodeysell</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GlobalProvider loading={loading} load={load} changeTheme={changeTheme}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Box
            sx={{
              bgcolor: theme.palette.bgcolor
                ? theme.palette.bgcolor.main
                : "background.paper",
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

export async function getInitialProps(context) {
  console.log("hello world");
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: { mode: "dark" }, // will be passed to the page component as props
  };
}
