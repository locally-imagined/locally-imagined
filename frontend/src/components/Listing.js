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
import { useHistory } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";
import Category from "./Category";
import Items from "./Items";
import ItemDetails from "./ItemDetails";
import ReactLoading from "react-loading";
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
    props.getImagesSet(props.items[id].postID);
    setOpenItemUrl(props.items[id].url);
    setCurItemId(id);
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
          {props.loading && (
            <Box
              className={classes.loading}
              style={{ marginLeft: "37vw", height: "100vh" }}
            >
              <ReactLoading type="bars" color="grey" height={100} width={100} />
            </Box>
          )}

          {tab === "explore" && (
            <Items
              favoriteHandler={favoriteHandler}
              openItemHandler={openItemHandler}
              items={props.items}
              icon={"favorite"}
            />
          )}
          {props.noResult && (
            <Typography
              variant="h5"
              style={{
                marginLeft: "45%",
                color: " grey",
                paddingTop: "10vw",
                paddingBottom: "100vh",
              }}
            >
              No result
            </Typography>
          )}
        </Container>
      </Box>
      <ItemDetails
        openItem={openItem}
        setOpenItem={setOpenItem}
        openItemUrl={openItemUrl}
        curItemId={curItemId}
        items={props.items}
        images={props.images}
        setImages={props.setImages}
      />
    </Grid>
  );
};

export default Listing;
