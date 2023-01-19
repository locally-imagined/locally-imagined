import React from "react";
import { Toolbar } from "@material-ui/core";
import styles from "../../styles";
import "./AboutBar.css";
const AboutBar = () => {
  const classes = styles();
  return (
    <footer className="aboutbar">
      <a href="/about">About Us</a>
    </footer>
  );
};
export default AboutBar;
