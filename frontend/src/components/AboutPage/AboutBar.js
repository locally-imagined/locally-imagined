import React from "react";
import { Toolbar } from "@material-ui/core";
import styles from "../../styles";
const AboutBar = () => {
  const classes = styles();
  return (
    <Toolbar
      elevation={1}
      style={{
        backgroundColor: "#464754",
        height: "80px",
        bottom: "-10px",
        width: "97vw",
        marginTop: "50px",
        marginLeft: "-10px",
        zIndex: 2,
      }}
    >
      <a
        className={classes.footerLink}
        style={{ fontSize: "15px", marginLeft: "48%" }}
        href="/about"
      >
        About Us
      </a>
    </Toolbar>
  );
};
export default AboutBar;
