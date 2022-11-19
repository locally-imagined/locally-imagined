import React from "react";
import {
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardActionArea,
  Paper,
  CardContent,
  Toolbar,
  Modal,
  Avatar,
  Divider,
  IconButton,
  InputBase,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";
import Category from "./Category";
import Items from "./Items";
import ItemDetails from "./ItemDetails";
/**
 * Listing
 * @return {object} JSX
 */
const Listing = (props) => {
  const classes = styles();
  const history = useHistory();
  // const [images, setImages] = React.useState(props.items);

  const [tab, setTab] = React.useState("explore");
  const [openItem, setOpenItem] = React.useState(false);
  const [follow, setFollow] = React.useState("follow");
  const [curItemId, setCurItemId] = React.useState(0);
  const liked = [];
  const [openItemUrl, setOpenItemUrl] = React.useState("");
  const openItemHandler = (id) => {
    setOpenItem(true);
    //console.log(id, props.items);
    setOpenItemUrl(props.items[id].url);

    setCurItemId(id);

    //console.log(id);
  };
  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };
  const followHandler = (event) => {
    event.currentTarget.classList.toggle(classes.following);
    event.currentTarget.textContent.toggle("following");

    //setFollow("following");
  };
  const favoriteHandler = (event) => {
    //setCurItemId(0);
    event.currentTarget.classList.toggle(classes.favorited);
    if (!liked.includes(event.currentTarget.id)) {
      liked.push(event.currentTarget.id);
      console.log(liked);
    } else {
      liked.splice(liked.indexOf(event.currentTarget.id), 1);
      console.log(liked);
    }
  };
  if (!props.items) {
    return <h1>Loading</h1>;
  }
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
          {tab === "explore" && (
            <Items
              favoriteHandler={favoriteHandler}
              openItemHandler={openItemHandler}
              items={props.items}
              icon={"favorite"}
            />
          )}
          {tab === "following" &&
            props.items.slice(0, 5).map((item, index) => (
              <Card className={classes.item} key={index}>
                <CardActionArea>
                  <LazyLoadImage
                    className={classes.image}
                    src={item.url}
                    alt="Image Alt"
                    effect="blur"
                  />

                  <Avatar className={classes.artistAvatar}></Avatar>
                  <Typography className={classes.artistUserName}>
                    username
                  </Typography>
                  <CardContent></CardContent>
                </CardActionArea>
                <Button
                  className={classes.artistFollowButton}
                  id={index}
                  onClick={followHandler}
                >
                  follow
                </Button>
              </Card>
            ))}
        </Container>
      </Paper>
      <ItemDetails
        openItem={openItem}
        setOpenItem={setOpenItem}
        openItemUrl={openItemUrl}
        curItemId={curItemId}
        items={props.items}
      />
    </Grid>
  );
};

export default Listing;
