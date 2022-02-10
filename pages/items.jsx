import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "../src/GlobalContext";
import Pagination from "@mui/material/Pagination";

const Item = dynamic(() => import("../src/components/Item"));
const Items = (props) => {
  const { items } = props.items;
  const router = useRouter();
  const categories = [
    {
      id: 1,
      cat_name: "food stuff",
    },
    {
      id: 2,
      cat_name: "electronics",
    },
    {
      id: 3,
      cat_name: "phones",
    },
    {
      id: 4,
      cat_name: "laptops",
    },
    {
      id: 5,
      cat_name: "farm produce",
    },
    {
      id: 6,
      cat_name: "fashion",
    },
    {
      id: 7,
      cat_name: "service",
    },
    {
      id: 8,
      cat_name: "others",
    },
  ];
  const [currCat, setCurrCat] = React.useState(router.query.cat || "all");
  const [page, setPage] = React.useState(router.query.page || 1);
  const handlePagination = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (items.data.length === 0 && router.query.page > 1) {
      setPage(1);
    }
  }, [router]);
  React.useEffect(() => {
    const temp = { ...router.query };
    temp.page = page;
    if (page === 1) {
      delete temp.page;
    }
    router.push({ path: router.pathname, query: { ...temp } });
  }, [page]);

  React.useEffect(() => {
    const temp = { ...router.query };
    temp.cat = currCat;
    if (currCat === "all") {
      delete temp.cat;
    }
    router.replace({ path: router.pathname, query: { ...temp } });
  }, [currCat]);
  return (
    <Container sx={{ my: 2, px: { xs: "5px" } }}>
      <Stack
        className="categories"
        direction="row"
        spacing={1}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Chip
          onClick={() => setCurrCat("all")}
          color="primary"
          variant={currCat === "all" ? "filled" : "outlined"}
          label={"all"}
          key={"all"}
        />
        {categories.map((cat) => {
          return (
            <Chip
              onClick={() => setCurrCat(cat.cat_name)}
              color="primary"
              variant={currCat === cat.cat_name ? "filled" : "outlined"}
              label={cat.cat_name}
              key={cat.cat_name}
            />
          );
        })}
      </Stack>
      <Box sx={{ my: 5 }}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {items.data.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                color="text.primary"
                sx={{ my: 10, textAlign: "center" }}
              >
                No items from this location or category
              </Typography>
            </Grid>
          )}
          {items.data.map((item, index) => {
            return (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <Item item={item} />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={items.last_page}
                page={page}
                onChange={handlePagination}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Items;

export async function getServerSideProps(context) {
  try {
    let location = context.req.cookies.wds_location || "";
    location = location
      ? JSON.parse(context.req.cookies.wds_location).location
      : location;
    location = location === "all" ? "" : location;

    const data = await Axios.get(
      `https://buildbrothers.com/enenu/api/search?q=&api=true&city=${location}&cat=${
        context.query.cat || ""
      }&page=${context.query.page || 1}`
    );
    return {
      props: {
        items: data.data,
        message: false,
      },
    };
  } catch (e) {
    console.log(e);
    let location = context.req.cookies.wds_location || "";
    location = location
      ? JSON.parse(context.req.cookies.wds_location).location
      : location;
    const firstTime = !location;
    return {
      props: {
        items: { items: [] },
        message: true,
      },
    };
  }
}
