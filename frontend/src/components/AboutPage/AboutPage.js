import React from "react";
import { Typography } from "@material-ui/core";
import styles from "../../styles";
import Box from "@mui/material/Box";

import "react-lazy-load-image-component/src/effects/blur.css";
const AboutBar = () => {
  const classes = styles();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        poaition: "absolute",
        paddingTop: "60px",
        display: "block",
      }}
    >
      <Box className={classes.accountBox}>
        <Box
          className={classes.settingCard}
          style={{
            width: "40rem",
            position: "absolute",
            padding: "20px",
            display: "block",
            marginLeft: "25vw",
            marginTop: "25px",
            height: "15rem",
          }}
        >
          <Typography component={"span"}>
            <h2>About Us</h2>

            <br />
            <div
              style={{
                fontSize: "15px",
                color: "grey",
                paddingRight: "10px",

                position: "absolute",
              }}
            >
              <p>
                Locally Imagined is a marketplace for artists, purveyors, and
                normal people alike.
                <li>
                  A solution that simultaneously competes with and supplements
                  the traditional and archaic gallery, museum, and auction
                  formats.
                </li>
                <li>
                  A way for a customer to overcome the gatekeepers of the art
                  world.
                </li>
                <li>
                  A way for an artist to overcome the gatekeepers of the art
                  world
                </li>
              </p>
            </div>
          </Typography>
        </Box>

        <Box
          className={classes.settingCard}
          style={{
            width: "40rem",
            position: "absolute",
            padding: "20px",
            display: "block",
            marginLeft: "25vw",
            marginTop: "21rem",
            height: "10rem",
          }}
        >
          <Typography component={"span"}>
            <h2>Contact Us</h2>

            <br />
            <div
              style={{
                fontSize: "15px",
                color: "grey",
                paddingRight: "10px",
                bottom: "2rem",
                position: "absolute",
              }}
            >
              <a>locallyimagined@gmail.com</a>
            </div>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
export default AboutBar;
