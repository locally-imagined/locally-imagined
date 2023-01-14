import React from "react";
import { Toolbar, Box } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles";
import "./ChangePage.css";
const ChangePage = (props) => {
  const classes = styles();
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

  return (
    <span className="pagination">
      <ArrowBackIcon
        style={{ marginRight: "10rem" }}
        className="pagination-btn"
        onClick={prevHandler}
      />
      <p className="pagination-number">{props.offset + 1}</p>

      <ArrowForwardIcon className="pagination-btn" onClick={nextHandler} />
    </span>
  );
};
export default ChangePage;
