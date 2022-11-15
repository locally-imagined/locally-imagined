import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Box from "@mui/material/Box";

import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../../styles";

const AccountPage = (props) => {
  //console.log(props.user);
  const classes = styles();
  if (!props.user.userName) return <h1></h1>;

  return (
    <Grid className={classes.dashboardBox}>
      <Typography className={classes.accountBoardTitle}>
        Welcome Back {props.user.userName}
      </Typography>
      <Box className={classes.accountBoard}>
        <Typography className={classes.accountBoardDetails}>
          About {props.user.userName} <br />{" "}
          <p style={{ fontSize: "15px", color: "grey" }}>
            Joined November 2022
          </p>
          <br />
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Followers
          </span>
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Followings
          </span>
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Favorited
          </span>
        </Typography>
      </Box>
    </Grid>
  );
};
export default AccountPage;
