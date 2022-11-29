import React from "react";
import { Toolbar, List, ListItem, ListItemText } from "@material-ui/core";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { useHistory } from "react-router-dom";

import styles from "../styles";

/**
 * category list
 * @return {object} JSX
 */
const Category = (props) => {
  const classes = styles();
  const history = useHistory();
  const mediumOptions = [
    "all",
    "Painting",
    "Oil",
    "Watercolour",
    "Digital",
    "Other",
  ];

  const delivaryOptions = ["all", "Local Delivery", "Shipping", "Pickup"];

  const [anchorMed, setAnchorMed] = React.useState(null);
  const [anchorDel, setAnchorDel] = React.useState(null);
  const [medium, setMedium] = React.useState("");
  const [deliverytype, setDeliverytype] = React.useState("");
  const [selectedMedIndex, setSelectedMedIndex] = React.useState(0);
  const [selectedDelIndex, setSelectedDelIndex] = React.useState(0);

  const openMed = Boolean(anchorMed);
  const openDel = Boolean(anchorDel);

  const handleClickItem = (event) => {
    if (event.currentTarget.id === "medium-list")
      setAnchorMed(event.currentTarget);
    // if (event.currentTarget.id === "delivery-list")
    //   setAnchorDel(event.currentTarget);
  };
  const queryFormater = (filterOption) => {
    const mediumQuery =
      filterOption.medium === "all" ? "" : `medium=${filterOption.medium}`;
    if (!mediumQuery) props.setFilterQuery(``);
    // const deliveryQuery =
    //   filterOption.deliverytype === "all"
    //     ? ""
    //     : mediumQuery
    //     ? `&deliverytype=${filterOption.deliverytype}`
    //     : `deliverytype=${filterOption.deliverytype}`;
    return mediumQuery;
  };
  const handleItemClick = (event, index) => {
    if (event.currentTarget.id.includes("medium-menu-item")) {
      props.setOffset(0);
      setSelectedMedIndex(index);
      setAnchorMed(null);
      setMedium(mediumOptions[index]);
      props.filterOption.medium = mediumOptions[index];
      console.log(props.filterOption);
      console.log(queryFormater(props.filterOption));
      const query = queryFormater(props.filterOption);
      props.getPosts(query, 0);
      props.setFilterQuery(query);
    }
    // if (event.currentTarget.id.includes("delivery-menu-item")) {
    //   setSelectedDelIndex(index);
    //   setAnchorDel(null);
    //   setDeliverytype(delivaryOptions[index]);
    //   props.filterOption.deliverytype = delivaryOptions[index];
    //   console.log(props.filterOption);
    //   console.log(queryFormater(props.filterOption));
    //   props.getFilterPosts(queryFormater(props.filterOption));
    // }
  };

  const handleClose = (event) => {
    setAnchorMed(null);
    setAnchorDel(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.categoryBox}>
      <Toolbar position="static" className={classes.categoryBar}>
        <List
          component="nav"
          aria-label="Medium settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="medium-list"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Medium"
            aria-expanded={openMed ? "true" : undefined}
            onClick={handleClickItem}
            className={classes.categoryBarItem}
          >
            <ListItemText
              primary="Medium"
              secondary={mediumOptions[selectedMedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="medium-menu"
          anchorEl={anchorMed}
          open={openMed}
          onClose={(event) => handleClose(event)}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {mediumOptions.map((option, index) => (
            <MenuItem
              key={option}
              id={"medium-menu-item-" + option}
              selected={index === selectedMedIndex}
              onClick={(event) => handleItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* <List
          component="nav"
          aria-label="Delivery settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="delivery-list"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Delivery"
            aria-expanded={openDel ? "true" : undefined}
            onClick={handleClickItem}
            className={classes.categoryBarItem}
          >
            <ListItemText
              primary="Delivery"
              secondary={delivaryOptions[selectedDelIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="delivery-menu"
          anchorEl={anchorDel}
          open={openDel}
          onClose={(event) => handleClose(event)}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {delivaryOptions.map((option, index) => (
            <MenuItem
              key={option}
              id={"delivery-menu-item-" + option}
              selected={index === selectedDelIndex}
              onClick={(event) => handleItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu> */}
      </Toolbar>
    </Box>
  );
};

export default Category;
