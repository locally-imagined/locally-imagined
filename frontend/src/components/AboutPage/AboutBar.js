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
        height: "250px",
        bottom: "-10px",
        width: "97vw",
        marginTop: "-10px",
        marginLeft: "-10px",
        zIndex: 2,
      }}
    >
      <ul className={classes.footerNav}>
        <li className={classes.footerItem}>
          <a className={classes.footerLink} href="/about">
            About
          </a>
        </li>

        <li className={classes.footerItem}>
          <a className={classes.footerLink} href="/about">
            Terms of Use
          </a>
        </li>
        <li className={classes.footerItem}>
          <a className={classes.footerLink} href="/about">
            Privacy Policy
          </a>
        </li>

        <li className={classes.footerItem}>
          <a className={classes.footerLink} href="/about">
            Contact Us
          </a>
        </li>
      </ul>

      <p className={classes.footerCopyright}>
        &copy; Copyright by
        <a className={classes.footerLink} target="_blank" href="/about">
          {` LocallyImagined`}
        </a>
      </p>
    </Toolbar>
  );
};
export default AboutBar;
