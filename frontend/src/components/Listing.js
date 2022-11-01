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
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "../styles";
import states from "../states";

/**
 * right bar
 * @return {object} JSX
 */
const RightBar = (props) => {
  const classes = styles();
  const history = useHistory();

  const items = props.items;

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

            {items.slice(1, 30).map((item) => (
              <Card className={classes.item} key={item.id}>
                <CardActionArea>
                  <LazyLoadImage
                    className={classes.image}
                    src={item.url}
                    width={600}
                    height={600}
                    alt="Image Alt"
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
