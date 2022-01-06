import React from "react";
import {
  Box,
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  Autocomplete,
  Checkbox,
  ListItemText,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import SwapLayout from "../../src/components/swap/SwapLayout";
const categories = [
  "food stuffs",
  "fruits",
  "vegetables",
  "electronics",
  "phones",
  "laptops",
  "farm produce",
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
  "Rubber Raint",
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
  const [item, setItem] = React.useState({
    name: "",
    price: "",
    city: "Makurdi",
    state: "Benue",
    description: "",
    phone: "",
    email: "",
    categories: [],
    photo: [],
  });
  return (
    <SwapLayout>
      <Grid item xs={12} sm={6}>
        <TextField
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
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          label="Item Price"
          placeholder="For how much did you get this item?"
          variant="filled"
          fullWidth
        />
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
            <TextField variant="filled" {...params} label="City" fullWidth />
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
          value={item.email}
          onChange={(e) => setItem({ ...item, email: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
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
        <Avatar variant="rounded">
          <AddIcon />
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disableElevation
          sx={{ width: "100%", p: 1 }}
          onClick={() => console.log(item)}
        >
          Add
        </Button>
      </Grid>
    </SwapLayout>
  );
};

export default Add;
