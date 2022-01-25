import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Box,
  Container,
  Stack,
  Breadcrumbs,
} from "@mui/material";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YoutubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import MapIcon from "./icons/MapIcon";
const Footer = () => {
  return (
    <>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container>
          <Box sx={{ py: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" sx={{ color: "white !important" }}>
                  We Are Social
                </Typography>
                <Stack direction="row" spacing={1} sx={{ ml: "-10px" }}>
                  <Link
                    href="https://web.facebook.com/whodeysell.com.ng"
                    passHref
                  >
                    <a target="_blank">
                      <IconButton>
                        <FacebookIcon color="white" />
                      </IconButton>
                    </a>
                  </Link>
                  <Link href="https://twitter.com/whodeysell_ng">
                    <a target="_blank">
                      <IconButton>
                        <TwitterIcon color="white" />
                      </IconButton>
                    </a>
                  </Link>
                  <Link href="https://www.instagram.com/whodeysell_ng/">
                    <a target="_blank">
                      <IconButton>
                        <InstagramIcon color="white" />
                      </IconButton>
                    </a>
                  </Link>
                  <Link href="https://www.youtube.com/channel/UCyf4rFGacCvCvz8cBjyrNdw">
                    <a target="_blank">
                      <IconButton>
                        <YoutubeIcon color="white" />
                      </IconButton>
                    </a>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4} sx={{ color: "white !important" }}>
                <Typography variant="h5">Useful Links</Typography>
                <Stack>
                  <Link href="/swap">
                    <a>Swap-It</a>
                  </Link>
                  <Link href="/">
                    <a>About</a>
                  </Link>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                  <Link href="/">
                    <a>Contact</a>
                  </Link>
                  <Link href="https://towncryer.com.ng/">
                    <a>News</a>
                  </Link>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  color: "white !important",
                  ".MuiTypography-span": {
                    display: "flex !important",
                    alignItems: "flex-start",
                  },
                }}
              >
                <Typography variant="h5">Contact Info</Typography>
                <Stack spacing={1}>
                  <Typography variant="span">
                    <MapIcon color="white" /> 11, Kashim Ibrahim Road, Old GRA,
                    Makurdi, Nigeria.
                  </Typography>
                  <Typography variant="span">
                    <PhoneIcon />{" "}
                    <a href="tel:+234 8052465145">+234 8052465145</a>
                  </Typography>
                  <Typography variant="span">
                    <EmailIcon />{" "}
                    <a href="mailto:support@buildbrothers.com">
                      support@buildbrothers.com
                    </a>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box sx={{ py: 1 }}>
        <Container>
          <Typography variant="span">
            © {new Date().getFullYear()} Build Brothers NG
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
