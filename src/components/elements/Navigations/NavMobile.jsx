import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  SpeedDial,
  SpeedDialAction,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/CloseSharp";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import { Search, SearchIconWrapper, StyledInputBase } from "../SearchInput";
import Link from "next/link";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavB from "./NavB";
import { GlobalContext } from "../../../GlobalContext";
import { CleanURL } from "simple-sharer";
import { useRouter } from "next/router";
const NavMobile = () => {
  const [drawer, openDrawer] = React.useState(false);
  const {
    user,
    setUser,
    logOut,
    theme,
    setTheme,
    search,
    setSearch,
    makeSearch,
  } = React.useContext(GlobalContext);
  const router = useRouter();
  const actions = [
    {
      icon: <AccountCircleIcon />,
      text: "Go to profile",
      func: () =>
        router.push(
          user.authenticated
            ? `/user/${CleanURL(`${user.name}/${user.id}`)}`
            : "/login"
        ),
    },
    {
      icon: <AddIcon />,
      text: "Add New Item",
      func: () => router.push("/add"),
    },
    {
      icon: <SearchIcon />,
      text: "Search",
      func: () => router.push("/search"),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
        }}
      >
        <AppBar position="static">
          <Container>
            <Toolbar sx={{ px: 0 }}>
              <Stack sx={{ width: "100%", py: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    sx={{ p: "15px" }}
                    onClick={() => openDrawer(!drawer)}
                  >
                    <Box component="img" src="/menu.svg" />
                  </IconButton>
                  <Link href="/">
                    <a>
                      <Box
                        component="img"
                        src="/wds_.png"
                        sx={{ width: "100px" }}
                      />
                    </a>
                  </Link>
                  <IconButton>
                    <AccountCircleIcon color="white" fontSize="large" />
                  </IconButton>
                </Box>
                <Search>
                  <StyledInputBase
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search whodeysell..."
                    inputProps={{ "aria-label": "search" }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        makeSearch();
                      }
                    }}
                  />
                  <SearchIconWrapper>
                    <IconButton onClick={() => makeSearch()}>
                      <SearchIcon color="white" />
                    </IconButton>
                  </SearchIconWrapper>
                </Search>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
        <NavB />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<AddIcon />}
          direction="left"
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={action.func}
              key={action.text}
              icon={action.icon}
              tooltipTitle={action.text}
            />
          ))}
        </SpeedDial>
      </Box>
      <SwipeableDrawer
        anchor={"left"}
        open={drawer}
        onClose={() => openDrawer(false)}
        onOpen={() => openDrawer(true)}
      >
        <Box
          sx={{
            width: 250,
            bgcolor: "bgcolor.main",
            height: "100%",
            ".MuiListItem-root": {
              cursor: "pointer !important",
              width: "100% !important",
            },
          }}
          role="presentation"
          onClick={() => openDrawer(false)}
          onKeyDown={() => openDrawer(false)}
        >
          <List>
            <Link href="/">
              <a>
                <ListItem>
                  <Box
                    component="img"
                    src="/wds-.png"
                    sx={{ width: "80%", height: "60px" }}
                  />
                </ListItem>
              </a>
            </Link>
          </List>
          <Divider />
          <List>
            <Link
              href={
                user.authenticated
                  ? `/user/${CleanURL(`${user.name}/${user.id}`)}`
                  : "/login"
              }
            >
              <a>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.name} secondary={"Profile"} />
                </ListItem>
              </a>
            </Link>
            <Link href="/add">
              <a>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add"} secondary={"Add new item"} />
                </ListItem>
              </a>
            </Link>
            <Link href="/swap">
              <a>
                <ListItem>
                  <ListItemIcon>
                    <SwapVerticalCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Swap-It"}
                    secondary={"Swap your items"}
                  />
                </ListItem>
              </a>
            </Link>
          </List>
          <Divider />
          <ListItem
            onClick={() =>
              setTheme(
                theme === "light" || theme === undefined ? "dark" : "light"
              )
            }
          >
            <ListItemIcon>
              {theme === "light" || theme === undefined ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                theme === "light" || theme === undefined
                  ? "Dark Mode"
                  : "Light Mode"
              }
              secondary={`Change to ${
                theme === "light" || theme === undefined
                  ? "Dark Mode"
                  : "Light Mode"
              }`}
            />
          </ListItem>
          <Divider />
          <List sx={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            {user.authenticated ? (
              <ListItem onClick={() => logOut()}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <>
                <Link href="/login">
                  <a>
                    <ListItem>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </a>
                </Link>
                <Link href="/register">
                  <a>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItem>
                  </a>
                </Link>
              </>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NavMobile;
