import React from "react";
import { Grid, InputBase } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles";
import states from "../states";
import { Search } from "@material-ui/icons";
import axios from "axios";
/**
 * SearchBar
 * @return {object} JSX
 */
const SearchBar = (props) => {
  const classes = styles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    history.push("/");
    props.setCurPath("/");
  }, [window.performance.getEntriesByType("navigation")[0].type]);

  const enterHandler = (event) => {
    if (event.key === "Enter") {
      if (search === "") {
        props.setFilter([]);
        history.push(`/`);
        window.location.reload(false);
      } else {
        searchImage(search);
      }
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
    props.setSearch(event.target.value.toLowerCase());
    // console.log(`search:${search}`);
    // console.log(`items:`, props.items);

    // const filteredSearch = props.items.filter((value) => {
    //   return value.title.toLowerCase().includes(search.toLowerCase());
    // });
    // console.log(filteredSearch);
    // setFilter(filteredSearch);
  };
  const searchImage = (keyword) => {
    const searchQuery = `?keyword=${keyword}`;
    props.setLoading(true);
    axios
      .get(
        `https://locally-imagined.herokuapp.com/posts/getpage/${props.offset}${searchQuery}`,
        {}
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          const data = res.data;
          props.getSrc(data).then(() => {
            console.log(JSON.parse(JSON.stringify(data)));
            props.setLoading(false);
            data.length === 0
              ? props.setNoResult(true)
              : props.setNoResult(false);
            props.setFilter(data);
            props.setOffset(0);
            history.push(`/posts/getpage/${props.offset}${searchQuery}`);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          onKeyDown={enterHandler}
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
