import React from "react";
import {
  Box,
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { ValidateLogin } from "../src/Validation";
import Link from "next/link";
import Axios from "axios";
import { GlobalContext } from "../src/GlobalContext";
import { useRouter } from "next/router";
const Login = () => {
  const defaultError = { message: "", path: "" };
  const [error, setError] = React.useState(defaultError);
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
  });
  const { user, setUser, loads, setLoads } = React.useContext(GlobalContext);
  const router = useRouter();
  const login = async () => {
    const validate = ValidateLogin(details);
    if (validate.error) {
      return setError({
        ...validate.error.details[0],
        path: validate.error.details[0].path[0],
      });
    }
    setLoads(true);
    setError(defaultError);
    await Axios.post("/login", details)
      .then((res) => {
        if (res.data.token) {
          setUser({
            ...res.data.user,
            authenticated: true,
            token: res.data.token,
          });
          setLoads(false);
          router.push(`/${router.query.from || ""}`);
          return;
        }
        if (res.data.message.includes("connect ETIMEDOUT")) {
          setError({
            message: "Please make sure you have an internet connection",
            path: "authError",
          });
        } else if (
          res.data.message.includes("Request failed with status code 401")
        ) {
          setError({
            message: "Invalid email address or password",
            path: "authError",
          });
        }
        setLoads(false);
      })
      .catch((e) => {
        setLoads(false);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 10 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" color="secondary">
              | Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.path === "email"}
              helperText={error.path === "email" && error.message}
              label="Email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.path === "password"}
              helperText={error.path === "password" && error.message}
              label="Password"
              type="password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() => login()}
              variant="contained"
              disableElevation
              sx={{ width: "100%", py: 1 }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center !important" }}>
            <Typography variant="span">
              Don't Have an Account?{" "}
              <Link href="/register">
                <a>
                  <b>Register Here</b>
                </a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center !important" }}>
            {error.path === "authError" && (
              <Alert severity="error">{error.message}</Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;

export const getServerSideProps = async ({ params, req }) => {
  if (req.cookies.wds_user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
