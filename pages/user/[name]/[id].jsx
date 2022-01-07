import React from "react";
import Axios from "axios";
import {
  Grid,
  Container,
  Box,
  Stack,
  IconButton,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import Item from "../../../src/components/Item";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import EditIcon from "@mui/icons-material/Edit";
const User = ({ data }) => {
  const { user, items } = data;
  const [active, setActive] = React.useState("profile");
  //   console.log(user);
  return (
    <Container sx={{ px: { xs: "5px" } }}>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: { xs: "center", md: "flex-start" },
                ".MuiButton-root": {
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: "center !important",
                  p: 2,
                  mb: 1,
                },
              }}
            >
              <Button
                onClick={() => setActive("profile")}
                disableElevation
                variant={active === "profile" && "contained"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" },
                  width: { md: "100% !important", xs: "fit-content" },
                }}
              >
                <IconButton sx={{ color: "inherit" }}>
                  <AccountCircleIcon />
                </IconButton>
                Profile
              </Button>
              <Button
                onClick={() => setActive("items")}
                disableElevation
                variant={active === "items" && "contained"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" },
                  width: { md: "100% !important", xs: "fit-content" },
                }}
              >
                <IconButton sx={{ color: "inherit" }}>
                  <VideoLabelIcon />
                </IconButton>
                Items
              </Button>
              <Button
                onClick={() => setActive("edit")}
                disableElevation
                variant={active === "edit" && "contained"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" },
                  width: { md: "100% !important", xs: "fit-content" },
                }}
              >
                <IconButton sx={{ color: "inherit" }}>
                  <EditIcon />
                </IconButton>
                Edit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {active === "profile" ? (
              <>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  sx={{ alignItems: { xs: "center", md: "flex-start" } }}
                >
                  <Avatar
                    src={user.profile_pic}
                    variant="rounded"
                    sx={{ width: 80, height: 80 }}
                  ></Avatar>
                  <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="p">{user.email}</Typography>
                    <Typography variant="p">{user.gender}</Typography>
                  </Box>
                </Stack>
              </>
            ) : active === "items" ? (
              <Grid item container spacing={1}>
                {items.length === 0 && (
                  <Typography variant="p">No items</Typography>
                )}
                {items.map((item) => {
                  return (
                    <Grid key={item.id} item xs={6} md={4}>
                      <Item item={item} />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default User;

export async function getServerSideProps({ params }) {
  try {
    const user = await Axios.post(
      `https://buildbrothers.com/enenu/api/profile/${params.id}`
    );
    return {
      props: { data: user.data },
    };
  } catch (e) {
    return {
      props: { user: "none" },
    };
  }
}
