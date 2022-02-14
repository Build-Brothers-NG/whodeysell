import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SwapLayout from "../../src/components/swap/SwapLayout";
import Link from "next/link";
import Image from "next/image";
const HowItWorks = () => {
  return (
    <SwapLayout>
      <Container sx={{ textAlign: "justify" }}>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            How WhoDeySell Swap-It Works
          </Typography>

          <Typography variant="p">
            WhoDeySell Swap-It is an easy way to swap items you are no longer
            using either for FREE or CASH or other items you need instead.
          </Typography>
          <Typography variant="p">
            The platform is very easy to use, all you have to do is to make sure
            you have an account with WhoDeySell and then click on Swap-It to
            visit the Swap-It page. Then, click on the Add button from the side
            menu to add a new item.
          </Typography>
          <Box
            component="img"
            src={"/howitworks.png"}
            sx={{ width: "100%", height: "fit-content" }}
          />
          <Typography variant="p">
            WhoDeySell does not sell these items, we are simply a medium that
            people who have items to swap can use to reach their targeted
            audience.
          </Typography>
          <Typography variant="p">
            So, go ahead and post that item you no longer use to swap it for
            something else.
          </Typography>
        </Stack>
      </Container>
    </SwapLayout>
  );
};

export default HowItWorks;
