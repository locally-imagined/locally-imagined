import React from "react";
import { Toolbar, Container, Grid, Drawer } from "@material-ui/core";

import Category from "./Category";
import styles from "../styles";

/**
 * LeftBar
 * @return {object} JSX
 */
const AccountBar = (props) => {
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

export default AccountBar;
