import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { CleanURL } from "simple-sharer";
import dynamic from "next/dynamic";
import Image from "next/image";
const MapIcon = dynamic(() => import("../icons/MapIcon"));
const VisibilityIcon = dynamic(() => import("@mui/icons-material/Visibility"));
const Item = ({ item }) => {
  return (
    <Link href={CleanURL(`/swap/item/${item.itemName}/${item.id}`)} passHref>
      <a>
        <Card sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", height: 200, position: "relative" }}>
            <Image
              src={
                item.photo === ""
                  ? "/temp.jpg"
                  : `https://buildbrothers.com/enenu/images/${item.photo}`
              }
              layout="fill"
              objectFit="cover"
              priority
              alt={item.itemName}
              title={item.itemName}
            />
          </Box>
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
              <MapIcon color="primary" />
              {item.city}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default Item;
