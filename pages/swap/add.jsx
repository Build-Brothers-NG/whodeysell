import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { auth } from "../../utils/firebase";
import Link from "next/link";
import { ValidateSwapItem } from "../../src/Validation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SwapLayout from "../../src/components/swap/SwapLayout";
import { GlobalContext } from "../../src/GlobalContext";
import {
  Facebook,
  Twitter,
  Reddit,
  Whatsapp,
  Copy,
  CleanURL,
} from "simple-sharer";
import { getCookie } from "../../src/useCookie";
import dynamic from "next/dynamic";
const FacebookIcon = dynamic(() => import("@mui/icons-material/Facebook"));
const TwitterIcon = dynamic(() => import("@mui/icons-material/Twitter"));
const RedditIcon = dynamic(() => import("@mui/icons-material/Reddit"));
const LinkIcon = dynamic(() => import("@mui/icons-material/Link"));
const WhatsAppIcon = dynamic(() => import("@mui/icons-material/WhatsApp"));

const categories = [
  "food stuffs",
  "fruits",
  "vegetables",
  "electronics",
  "phones",
  "laptops",
  "farm produce",
];

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
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
  const { user, setUser, loads, setLoads } = React.useContext(GlobalContext);
  const defError = { message: "", path: "" };
  const defItem = {
    name: "",
    amount: "",
    city: "Makurdi",
    state: "Benue",
    description: "",
    phone: "",
    email: user.email,
    categories: [],
    photo: [],
  };
  const [error, setError] = React.useState(defError);
  const [open, setOpen] = React.useState({ name: "", id: "" });
  const [item, setItem] = React.useState({
    name: "",
    amount: "",
    city: "Makurdi",
    state: "Benue",
    description: "",
    phone: "",
    email: user.email,
    categories: [],
    photo: [],
  });
  const actions = [
    { icon: <FacebookIcon />, text: "Share on Facebook", func: Facebook },
    { icon: <TwitterIcon />, text: "Share on Twitter", func: Twitter },
    { icon: <WhatsAppIcon />, text: "Share on Whatsapp", func: Whatsapp },
    { icon: <RedditIcon />, text: "Share on Reddit", func: Reddit },
    { icon: <LinkIcon />, text: "Copy Link", func: Copy },
  ];
  const addItem = async () => {
    const validate = ValidateSwapItem(item);
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
            temp.photo = url;
            temp.amount = "0";
            // temp.city = [item.city, item.state];
            delete temp.state;
            delete temp.categories;
            delete temp.email;
            await Axios.post("/swap/add", {
              token: getCookie("wds_user").token,
              value: temp,
            })
              .then((res) => {
                console.log(res);
                setLoads(false);
                setItem(defItem);
                setOpen({ name: res.data.item.itemName, id: res.data.item.id });
              })
              .catch((e) => {
                console.log(e);
                setLoads(false);
                setError(e);
              });
          })
      );
    } else {
      const temp = { ...item };
      // temp.city = [item.city, item.state];
      // delete temp.photo;
      delete temp.state;
      delete temp.categories;
      delete temp.email;
      await Axios.post("/swap/add", {
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
          setLoads(false);
        });
    }
  };
  return (
    <SwapLayout>
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
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={item.amount}
          displayEmpty
          variant="filled"
          fullWidth
          label="Swap Mode"
          renderValue={(selected) => {
            if (selected === "") {
              return <>Select Swap Mode</>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          onChange={(e) => setItem({ ...item, amount: e.target.value })}
        >
          <MenuItem disabled value="">
            <em>Select Swap Mode</em>
          </MenuItem>
          {["Free", "Item + Money", "Money"].map((state) => {
            return <MenuItem value={state}>{state}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          disablePortal
          freeSolo
          autoSelect
          options={["Makurdi", "Gboko", "Otukpo"]}
          inputValue={item.city}
          onInputChange={(e, newInputValue) => {
            setItem({ ...item, city: newInputValue });
          }}
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="City"
              fullWidth
              error={error.path === "city"}
              helperText={error.path === "city" && error.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={item.state}
          variant="filled"
          fullWidth
          label="State"
          MenuProps={MenuProps}
          onChange={(e) => setItem({ ...item, state: e.target.value })}
        >
          {states.map((state) => {
            return <MenuItem value={state}>{state}</MenuItem>;
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Phone Number"
          placeholder="Your phone number"
          variant="filled"
          fullWidth
          error={error.path === "phone"}
          helperText={error.path === "phone" && error.message}
          value={item.phone}
          onChange={(e) => setItem({ ...item, phone: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email Address"
          placeholder="Your email address"
          variant="filled"
          fullWidth
          error={error.path === "email"}
          helperText={error.path === "email" && error.message}
          value={item.email}
          onChange={(e) => setItem({ ...item, email: e.target.value })}
        />
      </Grid>
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
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          variant="filled"
          fullWidth
          value={item.categories}
          displayEmpty
          label="Choose Item Categories"
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setItem({
              ...item,
              categories: typeof value === "string" ? value.split(",") : value,
            });
          }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <>Choose Item Categories</>;
            }
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Choose Item Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={item.categories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
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
      <Modal
        open={Boolean(open.name) && Boolean(open.id)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ bgcolor: "background.paper", p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your item was added successfully
          </Typography>
          <Link href={CleanURL(`/swap/item/${open.name}/${open.id}`)}>
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
                      url: `https://whodeysell.com.ng/swap${CleanURL(
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
    </SwapLayout>
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
