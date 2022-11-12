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
const Category = () => {
  const classes = styles();
  const history = useHistory();
  const mediumOptions = [
    "Oil",
    "Watercolour",
    "Acrylic",
    "Gouache",
    "Pastel",
    "Encaustic",
    "Fresco",
    "Spray Paint",
    "Digital",
  ];
  const subjectOptions = [
    "History Painting",
    "Portrait Art",
    "Genre Painting",
    "Landscape Painting",
    "Still Life Painting",
  ];
  const styleOptions = [
    "Realism",
    "Photorealism",
    "Expressionism",
    "Impressionism",
    "Abstract",
    "Surrealism",
    "Pop Art",
    "Anime",
  ];

  const [anchorMed, setAnchorMed] = React.useState(null);
  const [anchorSub, setAnchorSub] = React.useState(null);
  const [anchorSty, setAnchorSty] = React.useState(null);
  const [selectedMedIndex, setSelectedMedIndex] = React.useState(1);
  const [selectedSubIndex, setSelectedSubIndex] = React.useState(1);
  const [selectedStyIndex, setSelectedStyIndex] = React.useState(1);
  const openMed = Boolean(anchorMed);
  const openSub = Boolean(anchorSub);
  const openSty = Boolean(anchorSty);
  const handleClickItem = (event) => {
    if (event.currentTarget.id === "medium-list")
      setAnchorMed(event.currentTarget);
    if (event.currentTarget.id === "subject-list")
      setAnchorSub(event.currentTarget);
    if (event.currentTarget.id === "style-list")
      setAnchorSty(event.currentTarget);
  };

  const handleItemClick = (event, index) => {
    if (event.currentTarget.id.includes("medium-menu-item")) {
      setSelectedMedIndex(index);
      setAnchorMed(null);
    }
    if (event.currentTarget.id.includes("subject-menu-item")) {
      setSelectedSubIndex(index);
      setAnchorSub(null);
    }
    if (event.currentTarget.id.includes("style-menu-item")) {
      setSelectedStyIndex(index);
      setAnchorSty(null);
    }
  };

  const handleClose = (event) => {
    setAnchorMed(null);
    setAnchorSub(null);
    setAnchorSty(null);
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
        <List
          component="nav"
          aria-label="Subject settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="subject-list"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Subject"
            aria-expanded={openSub ? "true" : undefined}
            onClick={handleClickItem}
            className={classes.categoryBarItem}
          >
            <ListItemText
              primary="Subject"
              secondary={subjectOptions[selectedSubIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="subject-menu"
          anchorEl={anchorSub}
          open={openSub}
          onClose={(event) => handleClose(event)}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {subjectOptions.map((option, index) => (
            <MenuItem
              id={"subject-menu-item-" + option}
              key={option}
              selected={index === selectedSubIndex}
              onClick={(event) => handleItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <List
          component="nav"
          aria-label="Style settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="style-list"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Style"
            aria-expanded={openSty ? "true" : undefined}
            onClick={handleClickItem}
            className={classes.categoryBarItem}
          >
            <ListItemText
              primary="Style"
              secondary={styleOptions[selectedStyIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="style-menu"
          anchorEl={anchorSty}
          open={openSty}
          onClose={(event) => handleClose(event)}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {styleOptions.map((option, index) => (
            <MenuItem
              key={option}
              id={"style-menu-item-" + option}
              selected={index === selectedStyIndex}
              onClick={(event) => handleItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </Box>
  );
};

export default Category;
