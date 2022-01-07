import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Link from "next/link";
import { CleanURL } from "simple-sharer";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Item = ({ item }) => {
  return (
    <Link href={CleanURL(`/swap/item/${item.itemName}/${item.id}`)}>
      <a>
        <Card sx={{ width: "100%" }}>
          <CardMedia
            component="img"
            height="200"
            alt={item.itemName}
            title={item.itemName}
            image={
              item.photo === ""
                ? "/temp.jpg"
                : `https://buildbrothers.com/enenu/images/${item.photo}`
            }
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              px: { xs: "5px", md: "10px" },
            }}
          >
            <Typography variant="span" title={item.itemName}>
              {item.itemName}
            </Typography>
            <Typography variant="span" color="secondary">
              {item.phone_number}
            </Typography>
            <Typography variant="span" color="secondary">
              {item.item_price == 0 ? (
                "Free"
              ) : (
                <>₦{item.item_price.toLocaleString()}</>
              )}
            </Typography>
            <Typography
              variant="span"
              color="secondary"
              sx={{ display: "flex", alignItems: "center", ml: "-3px" }}
            >
              <VisibilityIcon color="primary" fontSize="small" />
              &#8193;{item.hits}
            </Typography>
            <Typography
              title={item.city}
              variant="span"
              color="secondary"
              sx={{ display: "flex", alignItems: "center", ml: "-5px" }}
            >
              <Box component="img" src="/map.svg" sx={{ width: "20px" }} />
              {item.city}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default Item;
