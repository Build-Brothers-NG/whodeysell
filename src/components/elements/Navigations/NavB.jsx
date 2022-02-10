import React from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MenuItem from "@mui/material/MenuItem";
import MapIcon from "../../icons/MapIcon";
import Link from "next/link";
import { Select_ } from "../CustomSelect";
import AddIcon from "@mui/icons-material/Add";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { GlobalContext } from "../../../GlobalContext";
const NavB = () => {
  const locations = ["all", "makurdi", "gboko", "otukpo"];
  const { location, changeLocation } = React.useContext(GlobalContext);
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "fit-content",
        bgcolor:
          theme.palette.mode === "dark" ? "transparent" : "secondary.main",
        py: "2px",
      }}
    >
      <Container
        sx={{ display: "flex", alignItems: "center", px: { xs: "5px" } }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <MapIcon sx={{ color: "white.main" }} />
          <Select_
            labelId="label"
            id="select"
            value={location.location}
            variant="standard"
            color="white"
            onChange={(e) => changeLocation({ location: e.target.value })}
          >
            {locations.map((local) => {
              return (
                <MenuItem key={local} value={local}>
                  {local === "all"
                    ? "All Cities"
                    : local[0].toUpperCase() + local.substring(1, local.length)}
                </MenuItem>
              );
            })}
          </Select_>
        </Box>
        <Breadcrumbs
          separator=" "
          sx={{
            a: {
              color: "white !important",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <Link href="/add" passHref prefetch={false}>
            <a>
              <AddIcon />
              Add
            </a>
          </Link>
          <Link href="/swap" passHref prefetch={false}>
            <a>
              <SwapVertIcon />
              Swapt-It
            </a>
          </Link>
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default NavB;
