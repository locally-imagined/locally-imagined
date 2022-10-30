import React from "react";
import {
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardActionArea,
  Divider,
  Paper,
  CardMedia,
  CardContent,
} from "@material-ui/core";

import { LocationOn } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "../styles";
import states from "../states";
import useItems from "../useItems";

/**
 * right bar
 * @return {object} JSX
 */
const RightBar = () => {
  const classes = styles();
  const history = useHistory();

  const items = useItems("https://jsonplaceholder.typicode.com/photos"); //fake json data

  return (
    <Grid item sm={7}>
      <Paper elevation={0} className={classes.listingPage}>
        <Grid align="center">
          <Card className={classes.announcement} elevation={0}>
            <p className={classes.anouncText}>
              Explore the Art Marketplace in Locally Imagined
            </p>
          </Card>

          <Divider className={classes.divider}></Divider>
        </Grid>
        <div className={classes.itemBox}>
          <Container>
            <p>
              Today's Picks
              <span className={classes.locationBox}>
                <Button className={classes.locationButton}>
                  <LocationOn />
                  Santa Cruz · 40 mi
                </Button>
              </span>
            </p>

            {items.slice(1, 20).map((item) => (
              <Card className={classes.item} key={item.id}>
                <CardActionArea>
                  <CardMedia
                    className={classes.image}
                    image={item.url}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography className={classes.itemTitle} varient="body">
                      {item.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Container>
        </div>
      </Paper>
    </Grid>
  );
};

export default RightBar;
