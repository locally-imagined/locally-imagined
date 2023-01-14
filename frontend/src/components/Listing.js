import React from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";
import Category from "./Category";
import states from "../states";
import Items from "./Items";
import ItemDetails from "./ItemDetails";
import Loading from "./UI/Loading";
import HorizontalScroll from "react-horizontal-scrolling";
import "./Listing.css";
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
        : props.artists[id].profpicID
    );
    props.getAvatar(
      props.tab === "explore"
        ? props.items[id].profpicID
        : props.artists[id].profpicID,

      "otherAvatar"
    );
    setOpenItemUrl(
      props.tab === "explore" ? props.items[id].url : props.artists[id].url
    );
    setCurItemId(id);
  };

  const handleTabChange = (event, newTab) => {
    props.setTab(newTab);
    props.setOffset(0);
    if (newTab === "artists") {
      // const userID = JSON.parse(sessionStorage.user).token.userID;
      // console.log(userID);
      props.getArtists();
    }
    if (newTab === "explore") {
      props.getPosts();
    }
  };
  return (
    <div className="listing-container">
      {/* <div> */}
      <Category
        filterOption={props.filterOption}
        getPosts={props.getPosts}
        setFilterQuery={props.setFilterQuery}
        setOffset={props.setOffset}
        tab={props.tab}
      />
      {/* <div> */}
      <Tabs
        value={props.tab ? props.tab : "explore"}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        className="listing-tab"
      >
        <Tab value="explore" label="Explore" />
        <Tab value="artists" label="Artists" />
      </Tabs>

      <div className="listing-items" data-testid="image-page">
        {props.loading && <Loading />}
        {!props.loading && props.tab === "explore" && (
          <Items
            openItemHandler={openItemHandler}
            items={props.items}
            tab={props.tab}
            setImages={props.setImages}
            setArtistItem={props.setArtistItem}
            setUserID={props.setUserID}
            getInfo={props.getInfo}
            getAvatar={props.getAvatar}
            icon={"favorite"}
          />
        )}
        {!props.loading && props.tab === "artists" && (
          <Items
            openItemHandler={openItemHandler}
            items={props.items}
            tab={props.tab}
            setImages={props.setImages}
            setArtistItem={props.setArtistItem}
            setUserID={props.setUserID}
            getInfo={props.getInfo}
            getAvatar={props.getAvatar}
            icon={"favorite"}
          />
        )}

        {props.noResult && (
          <Typography variant="h5" className="no-result-msg">
            No Results
          </Typography>
        )}
      </div>

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
        getInfo={props.getInfo}
        getAvatar={props.getAvatar}
      />
    </div>
  );
};

export default Listing;
