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
    "All",
    "Drawing",
    "Painting",
    "Photography",
    "Print",
    "Sculpture",
    "Digital",
    "Other",
  ];

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // console.log(yesterday);
  let lastweek = new Date();
  lastweek.setDate(lastweek.getDate() - 7);
  let lastmonth = new Date();
  lastmonth.setMonth(lastmonth.getMonth() - 1);
  let last3 = new Date();
  last3.setMonth(last3.getMonth() - 3);
  let lastyear = new Date();
  lastyear.setFullYear(lastyear.getFullYear() - 1);
  ("2022-01-01");
  const dateOptions = [
    { Range: "All" },
    { Range: "Last 24 Hours", Date: yesterday.toISOString().slice(0, 10) },
    { Range: "Last Week", Date: lastweek.toISOString().slice(0, 10) },
    { Range: "Last Month", Date: lastmonth.toISOString().slice(0, 10) },
    { Range: "Last 3 Months", Date: last3.toISOString().slice(0, 10) },
    { Range: "Last Year", Date: lastyear.toISOString().slice(0, 10) },
  ];

  const [anchorMed, setAnchorMed] = React.useState(null);
  const [anchorDate, setAnchorDate] = React.useState(null);
  const [anchorMedDel, setAnchorMedDel] = React.useState(null);
  const [anchorDateDel, setAnchorDateDel] = React.useState(null);
  const [medium, setMedium] = React.useState("All");
  const [date, setDate] = React.useState({ Range: "All" });
  const [selectedMedIndex, setSelectedMedIndex] = React.useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);

  const openMed = Boolean(anchorMed);
  const openDate = Boolean(anchorDate);

  const handleClickItem = (event) => {
    if (event.currentTarget.id === "medium-list")
      setAnchorMed(event.currentTarget);
    if (event.currentTarget.id === "date-list")
      setAnchorDate(event.currentTarget);
  };
  const queryMedFormater = (filterOption) => {
    const mediumQuery =
      filterOption.medium === "All" ? "" : `medium=${filterOption.medium}`;
    if (!mediumQuery) props.setFilterQuery(``);
    return mediumQuery;
  };
  const queryDateFormater = (filterOption) => {
    const dateQuery = !filterOption.date
      ? ""
      : `startDate=${filterOption.date}`;
    if (!dateQuery) props.setFilterQuery(``);
    return dateQuery;
  };
  const handleMediumClick = (event, index) => {
    if (event.currentTarget.id.includes("medium-menu-item")) {
      props.setOffset(0);
      setSelectedMedIndex(index);
      setAnchorMed(null);
      setMedium(mediumOptions[index]);
      props.filterOption.medium = mediumOptions[index];
      // console.log(props.filterOption);
      // console.log(queryMedFormater(props.filterOption));
      let query = queryMedFormater(props.filterOption);
      if (date.Range !== "All") {
        query += "&startDate=" + date.Date;
      }
      props.getPosts(query);
      props.setFilterQuery(query);
    }
  };

  const handleDateClick = (event, index) => {
    if (event.currentTarget.id.includes("date-menu-item")) {
      props.setOffset(0);
      setSelectedDateIndex(index);
      setAnchorDate(null);
      setDate(dateOptions[index]);
      props.filterOption.date = dateOptions[index].Date;
      // console.log(props.filterOption);
      // console.log(queryDateFormater(props.filterOption));
      let query = queryDateFormater(props.filterOption);
      if (medium !== "All") {
        query += "&medium=" + medium;
      }
      props.getPosts(query);
      props.setFilterQuery(query);
    }
  };

  const handleMedClose = (event) => {
    setAnchorMed(null);
    setAnchorMedDel(null);
  };
  const handleDateClose = (event) => {
    setAnchorDate(null);
    setAnchorDateDel(null);
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
          onClose={(event) => handleMedClose(event)}
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
              onClick={(event) => handleMediumClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <List
          component="nav"
          aria-label="Date settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            id="date-list"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Date"
            aria-expanded={openDate ? "true" : undefined}
            onClick={handleClickItem}
            className={classes.categoryBarItem}
          >
            <ListItemText
              primary="Date"
              secondary={dateOptions[selectedDateIndex].Range}
            />
          </ListItem>
        </List>
        <Menu
          id="date-menu"
          anchorEl={anchorDate}
          open={openDate}
          onClose={(event) => handleDateClose(event)}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {dateOptions.map((option, index) => (
            <MenuItem
              key={option.Range}
              id={"date-menu-item-" + option.Range}
              selected={index === selectedDateIndex}
              onClick={(event) => handleDateClick(event, index)}
            >
              {option.Range}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </Box>
  );
};

export default Category;
