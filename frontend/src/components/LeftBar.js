import React from "react";
import { Toolbar, Container, Grid, Drawer } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Category from "./Category";
import styles from "../styles";

/**
 * LeftBar
 * @return {object} JSX
 */
const LeftBar = (props) => {
  const classes = styles();

  return (
    <Grid item sm={3}>
      <Drawer variant="permanent">
        <Container className={classes.leftbar}>
          <Toolbar />
          <Category />
        </Container>
      </Drawer>
    </Grid>
  );
};

export default LeftBar;
