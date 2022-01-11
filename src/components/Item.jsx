import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import Link from "next/link";
import { CleanURL } from "simple-sharer";
import dynamic from "next/dynamic";
import Image from "next/image";
const MapIcon = dynamic(() => import("./icons/MapIcon"));
const Item = ({ item }) => {
  return (
    <Link href={CleanURL(`/item/${item.itemName}/${item.id}`)}>
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
              {item.item_quantity} {item.q_unit}
              {item.item_quantity > 1 && <>s</>}
            </Typography>
            <Typography variant="span" color="secondary">
              ₦{item.item_price.toLocaleString()}
            </Typography>
            <Typography
              title={item.purchase_location}
              variant="span"
              color="secondary"
              sx={{ display: "flex", alignItems: "center", ml: "-5px" }}
            >
              <MapIcon color="primary" />
              {Boolean(
                item.purchase_location.substring(
                  30,
                  item.purchase_location.length
                )
              ) ? (
                <>{item.purchase_location.substring(0, 30)}...</>
              ) : (
                item.purchase_location.substring(0, 30)
              )}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default Item;
