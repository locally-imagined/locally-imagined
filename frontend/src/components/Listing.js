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
  CardContent,
  Toolbar,
  AppBar,
  List,
  Modal,
  Avatar,
  IconButton,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tabs from "@mui/material/Tabs";
import Link from "@mui/material/Link";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LocationOn } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "../styles";
import states from "../states";
import Category from "./Category";
/**
 * Listing
 * @return {object} JSX
 */
const Listing = (props) => {
  const classes = styles();
  const history = useHistory();
  const [tab, setTab] = React.useState("explore");
  const [openItem, setOpenItem] = React.useState(false);
  const [curItemId, setCurItemId] = React.useState(0);
  const liked = [];
  const [openItemUrl, setOpenItemUrl] = React.useState("");
  const openItemHandler = (id) => {
    setOpenItem(true);
    setOpenItemUrl(props.items[id - 1].url);
    setCurItemId(id - 1);

    // console.log(id);
  };
  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };
  const favoriteHandler = (event) => {
    event.currentTarget.classList.toggle(classes.favorited);
    if (!liked.includes(event.currentTarget.id)) {
      liked.push(event.currentTarget.id);
      console.log(liked);
    } else {
      liked.splice(liked.indexOf(event.currentTarget.id), 1);
      console.log(liked);
    }
  };
  //console.log(props.items);
  return (
    <Grid>
      <Category />
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        className={classes.listingTab}
      >
        <Tab value="explore" label="Explore" />
        <Tab value="following" label="Following" />
      </Tabs>

      <Paper elevation={0} className={classes.listingPage}>
        <Container>
          {tab === "explore" && <h3>Today's Picks</h3>}
          {tab === "following" && <h3>Artists to Follow</h3>}
          {/* <span className={classes.locationBox}>
            <Button
              className={classes.locationButton}
              style={{ color: "#2196f3" }}
            >
              <LocationOn />
              Santa Cruz · 40 mi
            </Button>
          </span> */}
          {tab === "explore" &&
            props.items.slice(0, 100).map((item) => (
              <Card className={classes.item} key={item.id}>
                <IconButton
                  className={classes.favoriteIcon}
                  onClick={(event) => favoriteHandler(event)}
                  id={item.id}
                >
                  <FavoriteIcon />
                </IconButton>
                <CardActionArea onClick={() => openItemHandler(item.id)}>
                  <LazyLoadImage
                    className={classes.image}
                    src={item.url}
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
          {tab === "following" &&
            props.items.slice(0, 5).map((item) => (
              <Card className={classes.item} key={item.id}>
                <CardActionArea>
                  <LazyLoadImage
                    className={classes.image}
                    src={item.url}
                    alt="Image Alt"
                  />

                  <Avatar className={classes.artistAvatar}></Avatar>
                  <Typography className={classes.artistUserName}>
                    username
                  </Typography>
                  <CardContent></CardContent>
                </CardActionArea>
                <Button className={classes.artistFollowButton}>Follow</Button>
              </Card>
            ))}
        </Container>
      </Paper>

      <Modal
        open={openItem}
        onClose={() => {
          setOpenItem(false);
        }}
      >
        <Paper className={classes.itemModal}>
          <LazyLoadImage
            className={classes.itemModalPicture}
            src={openItemUrl}
            alt="Image Alt"
            id={curItemId}
          ></LazyLoadImage>

          <Box className={classes.itemModalInfoBox}>
            <Toolbar className={classes.itemModalInfoBar}>
              <IconButton>
                <Avatar></Avatar>
              </IconButton>
              <p style={{ textTransform: "none" }}>
                <span className={classes.itemModalInfoTitle}>title</span> <br />
                <span style={{ color: "grey", paddingRight: "10px" }}>by</span>
                <span className={classes.itemModalInfoArtist}>artist</span>
              </p>{" "}
              <IconButton
                id={curItemId}
                className={classes.itemModalFavIcon}
                onClick={(event) => favoriteHandler(event)}
              >
                <FavoriteIcon />
              </IconButton>
            </Toolbar>
          </Box>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default Listing;
