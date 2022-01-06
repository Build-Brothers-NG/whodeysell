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
import Link from "next/link";
import { ValidateReg } from "../src/Validation";
import { GlobalContext } from "../src/GlobalContext";
import Axios from "axios";
const Register = () => {
  const { user, setUser, loads, setLoads } = React.useContext(GlobalContext);
  const defaultError = { message: "", path: "" };
  const [error, setError] = React.useState(defaultError);
  const [details, setDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const register = async () => {
    const validate = ValidateReg(details);
    if (validate.error) {
      console.log(validate.error.details[0]);
      return setError({
        ...validate.error.details[0],
        path: validate.error.details[0].path[0],
      });
    }
    setLoads(true);
    setError(defaultError);
    await Axios.post("/register", details)
      .then((res) => {
        if (res.data.token) {
          setUser({
            authenticated: true,
            token: res.data.token,
            name: details.name,
            id: "123456",
          });
          setLoads(false);
          return;
        }
        if (res.data.message.includes("connect ETIMEDOUT")) {
          setError({
            message: "Please make sure you have an internet connection",
            path: "authError",
          });
        } else if (
          res.data.message.includes("Request failed with status code 422")
        ) {
          setError({
            message: "There is user with this email address.",
            path: "authError",
          });
        }
        setLoads(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" color="secondary">
              | Register
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              label="Name"
              variant="filled"
              fullWidth
              error={error.path === "name"}
              helperText={error.path === "name" && error.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              label="Email"
              variant="filled"
              fullWidth
              error={error.path === "email"}
              helperText={error.path === "email" && error.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              error={error.path === "password"}
              helperText={error.path === "password" && error.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={details.confirm_password}
              onChange={(e) =>
                setDetails({ ...details, confirm_password: e.target.value })
              }
              label="Confirm Password"
              type="password"
              variant="filled"
              fullWidth
              error={error.path === "confirm_password"}
              helperText={
                error.path === "confirm_password" &&
                "This must match the password"
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disableElevation
              sx={{ width: "100%", py: 1 }}
              onClick={() => register()}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center !important" }}>
            <Typography variant="span">
              Already Have an Account?{" "}
              <Link href="/login">
                <a>
                  <b>Login Here</b>
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

export default Register;

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
