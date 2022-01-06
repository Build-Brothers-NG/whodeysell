import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Select } from "@mui/material";

export const Select_ = styled(Select)(({ theme }) => ({
  color: "white",
  svg: {
    color: "white",
  },
  "&:hover": {
    border: "none !important",
  },
  border: "none !important",
  "&::before": {
    border: "none !important",
  },
  "&::before:hover": {
    border: "none !important",
  },
  "&::after": {
    border: "none !important",
  },
  "&::after:hover": {
    border: "none !important",
  },
}));
