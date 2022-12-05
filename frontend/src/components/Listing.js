import React from "react";
import { Typography, Container, Grid, Link } from "@material-ui/core";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useHistory } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";
import Category from "./Category";
import states from "../states";
import Items from "./Items";
import ItemDetails from "./ItemDetails";
import ReactLoading from "react-loading";
/**
 * Listing
 * @return {object} JSX
 */
const Listing = (props) => {
  const classes = styles();

  const [openItem, setOpenItem] = React.useState(false);
  const [curItemId, setCurItemId] = React.useState(0);

  const [openItemUrl, setOpenItemUrl] = React.useState("");

  const openItemHandler = (id, username) => {
    setOpenItem(true);

    props.getImagesSet(
      props.tab === "explore"
        ? props.items[id].postID
        : props.artistItem[id].postID
    );
    props.getAvatar(
      props.tab === "explore"
        ? props.items[id].profpicID
        : props.artistItem[id].profpicID,
      username
    );
    setOpenItemUrl(
      props.tab === "explore" ? props.items[id].url : props.artistItem[id].url
    );
    setCurItemId(id);
  };

  const handleTabChange = (event, newTab) => {
    props.setTab(newTab);
    props.setOffset(0);
    if (newTab === "mypost") {
      const userID = JSON.parse(sessionStorage.user).token.userID;
      // console.log(userID);
      props.getArtistPosts(userID);
    }
    if (newTab === "explore") {
      props.getPosts();
    }
  };

  // const favoriteHandler = (event) => {
  //   //setCurItemId(0);
  //   event.currentTarget.classList.toggle(classes.favorited);
  //   if (!liked.includes(event.currentTarget.id)) {
  //     liked.push(event.currentTarget.id);
  //     console.log(liked);
  //   } else {
  //     liked.splice(liked.indexOf(event.currentTarget.id), 1);
  //     console.log(liked);
  //   }
  // };
  if (!props.items) {
    return <h1>Loading</h1>;
  }

  return (
    <Grid>
      <Category
        filterOption={props.filterOption}
        getPosts={props.getPosts}
        setFilterQuery={props.setFilterQuery}
        setOffset={props.setOffset}
        tab={props.tab}
      />
      <Tabs
        value={props.tab ? props.tab : "explore"}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        className={classes.listingTab}
      >
        <Tab value="explore" label="Explore" />

        {states.login && <Tab value="mypost" label="My Posts" />}
      </Tabs>

      <Box
        elevation={0}
        style={{ paddingTop: "20px" }}
        className={classes.listingPage}
      >
        <Container>
          {props.loading && (
            <Box
              className={classes.loading}
              style={{ marginLeft: "37vw", height: "100vh" }}
            >
              <ReactLoading type="bars" color="grey" height={100} width={100} />
            </Box>
          )}

          <Items
            // favoriteHandler={favoriteHandler}
            openItemHandler={openItemHandler}
            items={props.items}
            icon={"favorite"}
          />

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
        setUser={props.setUser}
        setUserID={props.setUserID}
        images={props.images}
        getArtistPosts={props.getArtistPosts}
        setImages={props.setImages}
        setArtistItem={props.setArtistItem}
        setContact={props.setContact}
        disableLink={false}
        setAvatar={props.setAvatar}
        avatar={props.avatar}
        getContactInfo={props.getContactInfo}
        getAvatar={props.getAvatar}
      />
    </Grid>
  );
};

export default Listing;
