import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import { Search, SearchIconWrapper, StyledInputBase } from "../SearchInput";
import Link from "next/link";

import { GlobalContext } from "../../../GlobalContext";
import { CleanURL } from "simple-sharer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const NavB = dynamic(() => import("./NavB"));
const AccountCircleIcon = dynamic(() =>
  import("@mui/icons-material/AccountCircle")
);
const SwapVerticalCircleIcon = dynamic(() =>
  import("@mui/icons-material/SwapVerticalCircle")
);
const CloseIcon = dynamic(() => import("@mui/icons-material/CloseSharp"));
const LoginIcon = dynamic(() => import("@mui/icons-material/Login"));
const MenuIcon = dynamic(() => import("../../icons/MenuIcon"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));
const LightModeIcon = dynamic(() => import("@mui/icons-material/LightMode"));
const DarkModeIcon = dynamic(() => import("@mui/icons-material/DarkMode"));
const SearchIcon = dynamic(() => import("@mui/icons-material/Search"));
const LogoutIcon = dynamic(() => import("@mui/icons-material/Logout"));
const KeyboardArrowUpIcon = dynamic(() =>
  import("@mui/icons-material/KeyboardArrowUp")
);
const KeyboardArrowDownIcon = dynamic(() =>
  import("@mui/icons-material/KeyboardArrowDown")
);

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
      icon: <SwapVerticalCircleIcon />,
      text: "Swap-It",
      func: () => router.push("/swap"),
    },
    {
      icon: <AddIcon />,
      text: "Add New Item",
      func: () => router.push("/add"),
    },
  ];
  return (
    <>
      <Box
        id="nav-top2"
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
                  <Link href="/" passHref>
                    <a>
                      <Box
                        component="img"
                        src="/wds_.png"
                        sx={{ width: "100px", height: "auto" }}
                      />
                    </a>
                  </Link>
                  <Link
                    href={
                      user.authenticated
                        ? `/user/${CleanURL(`${user.name}/${user.id}`)}`
                        : "/login"
                    }
                    passHref
                  >
                    <a>
                      <IconButton>
                        <AccountCircleIcon color="white" fontSize="large" />
                      </IconButton>
                    </a>
                  </Link>
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
            <Link href="/" passHref>
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
            <Link href="/add" passHref prefetch={false}>
              <a>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add"} secondary={"Add new item"} />
                </ListItem>
              </a>
            </Link>
            <Link href="/swap" passHref prefetch={false}>
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
                <Link href="/login" passHref>
                  <a>
                    <ListItem>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </a>
                </Link>
                <Link href="/register" passHref>
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
