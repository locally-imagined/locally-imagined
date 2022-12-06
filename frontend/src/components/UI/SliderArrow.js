import React from "react";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
const SliderArrow = (props) => {
  const classes = styles();
  return (
    <Box className={classes.arrowBox}>
      <IconButton onClick={props.prevHandler} className={classes.arrow}>
        <ArrowBackIcon className={classes.arrow} />
      </IconButton>
      <IconButton
        className={classes.arrow}
        onClick={props.nextHandler}
        style={{ marginLeft: props.marginLeft }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};
export default SliderArrow;
