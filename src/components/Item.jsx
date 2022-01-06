import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Link from "next/link";
import { CleanURL } from "simple-sharer";
const Item = ({ item }) => {
  return (
    <Link href={CleanURL(`/item/${item.itemName}/${item.id}`)}>
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
              <Box component="img" src="/map.svg" sx={{ width: "20px" }} />
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
