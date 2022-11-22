import React from "react";
import { Toolbar, Box } from "@material-ui/core";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles";

const ChangePage = (props) => {
  const classes = styles();
  const history = useHistory();
  const scrollOption = {
    top: 100,
    left: 100,
    behavior: "smooth",
  };
  useEffect(() => {
    props.setOffset(0);
  }, [props.curPath]);
  const prevHandler = () => {
    props.setOffset((val) => (val > 0 ? --val : val));
    window.scrollTo(scrollOption);
  };
  const nextHandler = () => {
    props.setOffset((val) => (props.items.length === 25 ? ++val : val));
    window.scrollTo(scrollOption);
  };
  // useEffect(() => {
  //   if (props.search) history.push(`/getpage/${offset}?keyword=${search}`);
  // }, [props.offset]);
  return (
    <Toolbar className={classes.changePage}>
      <Box className={classes.changePageLink}>
        <ArrowBackIcon
          style={{ paddingRight: "10rem" }}
          className={classes.changePageButton}
          onClick={prevHandler}
        />
        <Box
          style={{
            paddingRight: "10rem",
            display: "inline-block",
          }}
        >
          {props.offset + 1}
        </Box>

        <ArrowForwardIcon
          className={classes.changePageButton}
          onClick={nextHandler}
        />
      </Box>
    </Toolbar>
  );
};
export default ChangePage;
