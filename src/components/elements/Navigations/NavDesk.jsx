import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { Search, SearchIconWrapper, StyledInputBase } from "../SearchInput";
import Link from "next/link";
import { GlobalContext } from "../../../GlobalContext";

import { CleanURL } from "simple-sharer";
import dynamic from "next/dynamic";
const NavB = dynamic(() => import("./NavB"));
const AccountCircleIcon = dynamic(() =>
  import("@mui/icons-material/AccountCircle")
);
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
      id="nav-top"
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
              <Link href="/" passHref>
                <a>
                  <Box
                    component="img"
                    src="/wds_.png"
                    sx={{ width: "100px", height: "auto" }}
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
                  <Link
                    href={`/user/${CleanURL(`${user.name}/${user.id}`)}`}
                    passHref
                  >
                    <a>
                      <MenuItem>
                        <AccountCircleIcon /> Profile
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href="/add" passHref prefetch={false}>
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
                <Link href="/login" passHref>
                  <a>Login</a>
                </Link>
                <Link href="/register" passHref>
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
