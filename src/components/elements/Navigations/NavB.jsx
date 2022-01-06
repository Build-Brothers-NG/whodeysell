import React from "react";
import {
  Box,
  Container,
  Breadcrumbs,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { Select_ } from "../CustomSelect";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "../../../GlobalContext";
const NavB = () => {
  const locations = ["all", "makurdi", "gboko", "otukpo"];
  const { user, setUser, location, setLocation } =
    React.useContext(GlobalContext);
  return (
    <Box sx={{ height: "fit-content", bgcolor: "secondary.main", py: "2px" }}>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Select_
            labelId="label"
            id="select"
            value={location.location}
            variant="standard"
            color="white"
            onChange={(e) => setLocation({ location: e.target.value })}
          >
            {locations.map((local) => {
              return (
                <MenuItem key={local} value={local}>
                  {local[0].toUpperCase() + local.substring(1, local.length)}
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
          <Link href="/add">
            <a>
              <AddIcon />
              Add
            </a>
          </Link>
          <Link href="/swap">
            <a>Swapt It</a>
          </Link>
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default NavB;
