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
      </Tabs>

      <Box elevation={0} className={classes.listingPage}>
        <Container>
          {tab === "explore" && (
            <Items
              favoriteHandler={favoriteHandler}
              openItemHandler={openItemHandler}
              items={props.items}
              icon={"favorite"}
            />
          )}
        </Container>
      </Box>
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
