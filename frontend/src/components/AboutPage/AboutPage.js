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
                Locally Imagined is a Santa Cruz marketplace for artists, purveyors, and
                normal people alike. No longer do artists have to compete to get into
                prestigious and selective galleries. We present a solution that 
                simultaneously competes with and supplements the traditional and 
                archaic gallery, museum, and auction formats. Artists are now able to
                create their own galleries online and share it to their local community.
                Artists can continue sharing their art the way they already do, but can now
                also now tell their customers about their Locally Imagined gallery for
                additional exposure.  
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
