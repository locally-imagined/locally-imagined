import React from "react";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import "./SliderArrow.css";
/**
 * SliderArrow
 * @return {object} JSX
 */
const SliderArrow = (props) => {
  const classes = styles();
  return (
    <div className="arrow-container">
      <IconButton onClick={props.prevHandler} className="arrow">
        <ArrowBackIcon />
      </IconButton>
      <IconButton className="arrow" onClick={props.nextHandler}>
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};
export default SliderArrow;
