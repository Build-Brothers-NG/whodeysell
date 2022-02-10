import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Axios from "axios";
import dynamic from "next/dynamic";
const Item = dynamic(() => import("../src/components/Item"));
import { useRouter } from "next/router";
const Search = (props) => {
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
      <Box sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Showing results for {router.query.q} in{" "}
              {router.query.city || "All Cities"}
            </Typography>
          </Grid>
          {items.data.map((item) => {
            return (
              <Grid key={item.id} item sx={6} sm={4} md={3}>
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

export default Search;

export async function getServerSideProps({ query }) {
  const res = await Axios.get(
    `https://buildbrothers.com/enenu/api/search?q=${query.q}&api=true&city=${
      query.city || ""
    }&cat=${query.cat || ""}&page=${query.page || 1}`
  );
  return {
    props: { items: res.data }, // will be passed to the page component as props
  };
}
