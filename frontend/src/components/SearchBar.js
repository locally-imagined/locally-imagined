import React from "react";
import { Grid, InputBase, Button, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles";
import states from "../states";
import { Search } from "@material-ui/icons";
import { Cancel } from "@mui/icons-material";
/**
 * SearchBar
 * @return {object} JSX
 */
const SearchBar = (props) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState([]);

  const handleSearchChange = (event) => {
    const search = event.target.value;
    console.log(`search:${search}`);
    const filteredSearch = props.items.filter((value) => {
      return value.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(filteredSearch);
    props.setFilter(filteredSearch);
    states.filteredItems = filteredSearch;
    console.log(filteredSearch);
  };
  return (
    <Grid className={classes.topbar}>
      <div className={classes.search}>
        <span className={classes.searchIcon}>
          <Search />
        </span>
        <InputBase
          className={classes.searchInput}
          placeholder="Search Marketplace"
          onChange={handleSearchChange}
          onClick={() => {
            setOpen(true);
          }}
          type="search"
          name="search"
        />
      </div>
      {/* {filter.length !== 0 && open && (
        <div
          className={classes.searchResult}
          style={{
            marginLeft: "30px",
            marginTop: "-10px",
            width: "20vw",
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            style={{
              marginLeft: "230px",
            }}
          >
            <Cancel />
          </Button>
          {filter.slice(0, 100).map((value) => {
            return (
              <MenuItem className={classes.searchItems} key={value.id}>
                {value.title.slice(0, 30)}
              </MenuItem>
            );
          })}
        </div>
      )} */}
    </Grid>
  );
};
export default SearchBar;
