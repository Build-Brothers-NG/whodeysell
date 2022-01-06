import React from "react";
import {
  Typography,
  Button,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import QuestionMarkIcon from "@mui/icons-material/QuestionAnswer";
const SideBar = () => {
  const router = useRouter();
  const [active, setActive] = React.useState(router.pathname);
  const btns = [
    { label: "Home", link: "/swap", icon: <HomeIcon /> },
    { label: "Add", link: "/swap/add", icon: <AddIcon /> },
    { label: "Search", link: "/swap/search", icon: <SearchIcon /> },
    {
      label: "How It Works",
      link: "/swap/howitworks",
      icon: <QuestionMarkIcon />,
    },
  ];
  const theme = useTheme();
  const md_ = useMediaQuery(theme.breakpoints.up("md"));
  const sm_ = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        ".MuiButton-root": {
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center !important",
          p: 2,
        },
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Swap Your Items
      </Typography>
      <Stack
        spacing={sm_ ? 2 : 0}
        direction={md_ ? "column" : "row"}
        sx={{
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
        }}
      >
        {btns.map((btn) => {
          return (
            <Link href={btn.link}>
              <a style={{ width: md_ ? "100%" : "fit-content" }}>
                <Button
                  onClick={() => setActive(btn.link)}
                  disableElevation
                  variant={`${btn.link === active && "contained"}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: { xs: "column", md: "row" },
                    width: { md: "100% !important", xs: "fit-content" },
                  }}
                >
                  <IconButton sx={{ color: "inherit" }}>{btn.icon}</IconButton>{" "}
                  {/* {btn.icon} */}
                  {btn.label}
                </Button>
              </a>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SideBar;
