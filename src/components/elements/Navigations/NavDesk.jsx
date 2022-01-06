import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Breadcrumbs,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Search, SearchIconWrapper, StyledInputBase } from "../SearchInput";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import NavB from "./NavB";
import { GlobalContext } from "../../../GlobalContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const NavDesk = () => {
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Box
      sx={{
        ".MuiBreadcrumbs-li": { color: "white !important" },
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/">
                <a>
                  <Box
                    component="img"
                    src="/wds_.png"
                    sx={{ width: "100px" }}
                  />
                </a>
              </Link>
            </Box>
            <Search>
              <StyledInputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search whodeysell..."
                inputProps={{ "aria-label": "search" }}
                sx={{ color: "white.main" }}
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
            {user.authenticated ? (
              <>
                <Button
                  disableRipple
                  color="white"
                  sx={{ ml: 2 }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <AccountCircleIcon />{" "}
                  {user.name.length > 15 ? user.name.split(" ")[0] : user.name}{" "}
                  {Boolean(anchorEl) ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  onClick={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    <AccountCircleIcon /> Profile
                  </MenuItem>
                  <Link href="/add">
                    <a>
                      <MenuItem>
                        <AddIcon /> Add New Item
                      </MenuItem>
                    </a>
                  </Link>
                  <Divider />
                  <MenuItem
                    onClick={() =>
                      setTheme(
                        theme === "light" || theme === undefined
                          ? "dark"
                          : "light"
                      )
                    }
                  >
                    {theme === "light" || theme === undefined ? (
                      <>
                        <DarkModeIcon /> Dark mode
                      </>
                    ) : (
                      <>
                        <LightModeIcon /> Light mode
                      </>
                    )}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => logOut()}>
                    <>
                      <LogoutIcon /> Logout
                    </>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Breadcrumbs separator="|" sx={{ ml: 2 }} color="white">
                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </Breadcrumbs>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <NavB />
    </Box>
  );
};

export default NavDesk;
