import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "next/link";
import { ValidateItem } from "../src/Validation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../utils/firebase";
import Axios from "axios";
import { getCookie } from "../src/useCookie";
import { GlobalContext } from "../src/GlobalContext";
import {
  Facebook,
  Twitter,
  Reddit,
  Whatsapp,
  Copy,
  CleanURL,
} from "simple-sharer";
import dynamic from "next/dynamic";
const FacebookIcon = dynamic(() => import("@mui/icons-material/Facebook"));
const TwitterIcon = dynamic(() => import("@mui/icons-material/Twitter"));
const RedditIcon = dynamic(() => import("@mui/icons-material/Reddit"));
const LinkIcon = dynamic(() => import("@mui/icons-material/Link"));
const WhatsAppIcon = dynamic(() => import("@mui/icons-material/WhatsApp"));
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));
import stateLga from "../src/statesandlga";
const categories = [
  "food stuff",
  "electronics",
  "phones",
  "laptops",
  "farm produce",
  "fashion",
  "service",
  "others",
];
const units = [
  "Mudu",
  "Tiya",
  "Milk Tin",
  "Bag",
  "Small Bag",
  "Medium Bag",
  "Large Bag",
  "Kobiowu",
  "Groundnut Tin",
  "Tuber",
  "Heap",
  "Piece",
  "Wheel Barrow",
  "Basin",
  "Small Basket",
  "Medium Basket",
  "Large Basket",
  "Kongo",
  "Rubber Paint",
  "Bunch",
  "Head",
  "Cup",
  "Rubber",
  "Liters (L)",
  "Pounds",
  "Meters",
  "Muzu",
  "Centi Meters (CM)",
  "Milli Liters (ML)",
  "Milli Meters (ML)",
  "Centi Liters (ML)",
  "Inches (Inch)",
  "Kilo Gram (KG)",
  "Crate",
  "Pair",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Add = () => {
  const defError = { message: "", path: "" };
  const defItem = {
    name: "",
    amount: "",
    location: "",
    city: "",
    state: "",
    otherCity: "",
    description: "",
    qty: "",
    unit: "",
    category: "",
    photo: [],
  };
  const [error, setError] = React.useState(defError);
  const [open, setOpen] = React.useState({ name: "", id: "" });
  const [item, setItem] = React.useState(defItem);
  const [currState, setCurrState] = useState({ state: { locals: [{}] } });

  const actions = [
    { icon: <FacebookIcon />, text: "Share on Facebook", func: Facebook },
    { icon: <TwitterIcon />, text: "Share on Twitter", func: Twitter },
    { icon: <WhatsAppIcon />, text: "Share on Whatsapp", func: Whatsapp },
    { icon: <RedditIcon />, text: "Share on Reddit", func: Reddit },
    { icon: <LinkIcon />, text: "Copy Link", func: Copy },
  ];
  const { user, setLoads } = React.useContext(GlobalContext);
  const addItem = async () => {
    const validate = ValidateItem(item);
    if (validate.error) {
      console.log(validate.error);
      return setError({
        ...validate.error.details[0],
        path: validate.error.details[0].path[0],
      });
    }
    setLoads(true);
    setError(defError);
    if (item.photo.length !== 0) {
      const storage = getStorage();
      const imgRef = ref(storage, `items/${item.photo.name}`);
      const uploadImg = uploadBytesResumable(imgRef, item.photo);
      uploadImg.on(
        "state_changed",
        (snap) => {
          console.log((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          setAdding(false);
          console.log(error);
        },
        () =>
          getDownloadURL(uploadImg.snapshot.ref).then(async (url) => {
            const temp = { ...item };
            temp.city =
              temp.city.toLowerCase() === "others" &&
              !!temp.state &&
              !!temp.otherCity
                ? [temp.otherCity, temp.otherCity]
                : temp.city;
            temp.photo = url;
            delete temp.state;
            await Axios.post("/add", {
              token: getCookie("wds_user").token,
              value: temp,
            })
              .then((res) => {
                setLoads(false);
                setItem(defItem);
                setOpen({ name: res.data.item.itemName, id: res.data.item.id });
              })
              .catch((e) => {
                console.log(e);
                setError(e);
              });
          })
      );
    } else {
      const temp = { ...item };
      temp.city =
        temp.city.toLowerCase() === "others" && !!temp.state && !!temp.otherCity
          ? [temp.otherCity, temp.otherCity]
          : temp.city;
      delete temp.photo;
      delete temp.state;
      await Axios.post("/add", {
        token: getCookie("wds_user").token,
        value: temp,
      })
        .then((res) => {
          setLoads(false);
          setItem(defItem);
          setOpen({ name: res.data.item.itemName, id: res.data.item.id });
        })
        .catch((e) => {
          console.log(e);
          setError(e);
        });
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{ ".MuiFormHelperText-root": { color: "red" } }}
    >
      <Box sx={{ my: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Alert
              severity="success"
              icon={false}
              sx={{ p: 2, display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                }}
              >
                Hi {user.name}, what are you adding today!
              </Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.path === "name"}
              helperText={error.path === "name" && error.message}
              label="Item Name"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              placeholder="What is the item name?"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.path === "amount"}
              helperText={error.path === "amount" && error.message}
              value={item.amount}
              onChange={(e) => setItem({ ...item, amount: e.target.value })}
              label="Item Price"
              placeholder="For how much did you get this item?"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              error={error.path === "location"}
              helperText={error.path === "location" && error.message}
              value={item.location}
              onChange={(e) => setItem({ ...item, location: e.target.value })}
              label="Location"
              placeholder="Where did you get this item?"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              labelId="select-your-city"
              id="selec-city"
              value={item.city}
              variant="filled"
              fullWidth
              label="State"
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <>Choose City</>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              onChange={(e) => setItem({ ...item, city: e.target.value })}
            >
              <MenuItem disabled value="">
                <em>Choose city</em>
              </MenuItem>
              {["Makurdi", "Gboko", "Otukpo", "Others"].map((ct) => {
                return (
                  <MenuItem key={ct} value={ct}>
                    {ct}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          {item.city.toLowerCase() === "others" && (
            <>
              <Grid item xs={6}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={item.state}
                  variant="filled"
                  fullWidth
                  label="State"
                  MenuProps={MenuProps}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === "") {
                      return <>Choose State</>;
                    }
                    return selected;
                  }}
                  onChange={(e) => setItem({ ...item, state: e.target.value })}
                >
                  <MenuItem disabled value="">
                    <em>Choose State</em>
                  </MenuItem>
                  {stateLga.map((state) => {
                    return (
                      <MenuItem
                        key={state.state.name}
                        value={state.state.name}
                        onClick={() => setCurrState(state)}
                      >
                        {state.state.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  freeSolo
                  autoSelect
                  options={
                    item.state
                      ? currState.state.locals.map((st) => st.name)
                      : []
                  }
                  inputValue={item.otherCity}
                  onInputChange={(e, newInputValue) => {
                    setItem({ ...item, otherCity: newInputValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      {...params}
                      label="City"
                      fullWidth
                      // error={error.path === "city"}
                      // helperText={error.path === "city" && error.message}
                    />
                  )}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              error={error.path === "description"}
              helperText={error.path === "description" && error.message}
              id="filled-multiline-flexible"
              label="Item Description"
              multiline
              fullWidth
              rows={4}
              placeholder="Item Description"
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={error.path === "qty"}
              helperText={error.path === "qty" && error.message}
              label="Item Quantity"
              type="number"
              placeholder="Quantity of item?"
              variant="filled"
              fullWidth
              value={item.qty}
              onChange={(e) => setItem({ ...item, qty: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              disablePortal
              freeSolo
              autoSelect
              options={units}
              inputValue={item.unit}
              onInputChange={(e, newInputValue) => {
                setItem({ ...item, unit: newInputValue });
              }}
              renderInput={(params) => (
                <TextField
                  variant="filled"
                  {...params}
                  label="Item Unit"
                  placeholder="Units of this item?"
                  fullWidth
                  error={error.path === "unit"}
                  helperText={error.path === "unit" && error.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              variant="filled"
              fullWidth
              value={item.category}
              displayEmpty
              label="Choose Item Category"
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              renderValue={(selected) => {
                if (selected === "") {
                  return <>Choose Item Category</>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>Choose Item Category</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
            {error.path === "category" && (
              <FormHelperText>{error.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p" color="secondary">
              Add photo for this item
            </Typography>
            <label htmlFor="contained-button-file">
              <input
                onChange={(e) =>
                  setItem({ ...item, photo: e.target.files[0] || [] })
                }
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              {item.photo.length === 0 ? (
                <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                  <AddIcon />
                </Avatar>
              ) : (
                <Avatar
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                  src={URL.createObjectURL(item.photo)}
                >
                  <AddIcon />
                </Avatar>
              )}
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              disableElevation
              sx={{ width: "100%", p: 1 }}
              onClick={() => addItem()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={!!open.name && !!open.id}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ bgcolor: "background.paper", p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your item was added successfully
          </Typography>
          <Link href={CleanURL(`/item/${open.name}/${open.id}`)} passHref>
            <a>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Click here to view item now
              </Typography>
            </a>
          </Link>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Share item:
          </Typography>
          <Stack direction="row" spacing={2}>
            {actions.map((action) => {
              return (
                <IconButton
                  key={action.text}
                  onClick={() =>
                    action.func({
                      url: `https://whodeysell.com.ng${CleanURL(
                        `/item/${open.name}/${open.id}`
                      )}`,
                    })
                  }
                >
                  {action.icon}
                </IconButton>
              );
            })}
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default Add;

export const getServerSideProps = async ({ params, req }) => {
  if (!req.cookies.wds_user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?from=add",
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
