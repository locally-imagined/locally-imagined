import React from "react";
import {
  Button,
  Paper,
  Modal,
  Avatar,
  Divider,
  IconButton,
  Link,
} from "@material-ui/core";
import Box from "@mui/material/Box";

import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import CancelIcon from "@mui/icons-material/Cancel";

import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";
import ReactLoading from "react-loading";
import SliderDot from "./UI/SliderDot";
import SliderArrow from "./UI/SliderArrow";

const ItemDetails = (props) => {
  const classes = styles();
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [currSlideStyle, setCurrSlideStyle] = useState({ opacity: "100%" });
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const scrollOption = {
    top: 60,
    left: 100,
    behavior: "smooth",
  };
  const onImgLoad = ({ target: img }) => {
    // console.log(img.naturalWidth, img.naturalHeight);
    let width = "50vw",
      height = "100%";
    if (img.naturalHeight / img.naturalWidth > 1.1) {
      const ratio = img.naturalWidth / img.naturalHeight;
      console.log("ratio:", ratio);
      width = 50 * ratio + "vw";
      // console.log("width:", width);
      setPaddingLeft((50 * ratio) / 4 + "vw");
    }
    if (img.naturalWidth / img.naturalHeight > 1.1) {
      const ratio = img.naturalHeight / img.naturalWidth;
      console.log("ratio:", ratio);
      height = 100 * ratio + "%";
      // console.log("height:", height);
    }
    setDimension({
      width: width,
      height: height,
    });
  };
  const resetPadding = () => {
    setPaddingLeft(0);
    setPaddingTop(0);
  };
  const closeHandler = () => {
    props.setOpenItem(false);
    setOffset(0);
    resetPadding();
    props.setImages([]);
  };
  const prevHandler = () => {
    setOffset((val) => {
      if (val > 0) {
        resetPadding();
        val--;
      }
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < props.images.length - 1) {
        resetPadding();
        val++;
      }
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
  };
  const artistPost = (userID, username) => {
    // console.log(userID);
    // console.log(username);
    props.setImages([]);
    props.setArtistItem([]);
    sessionStorage.setItem("currentUserID", userID);
    props.setUserID(userID);
    history.push(`/profile/${username}`, {
      userID: userID,
      username: username,
    });
    window.scrollTo(scrollOption);
  };
  const contactHandler = (userID, username) => {
    props.setImages([]);
    sessionStorage.setItem("currentUserID", userID);
    props.setUserID(userID);
    sessionStorage.setItem("currentUsername", username);
    props.getContactInfo(userID);
    history.push(`/contact/user:${username}`, { userID: userID });
  };
  return (
    <Modal open={props.openItem}>
      <Paper
        className={classes.itemModal}
        style={{ width: "80vw", height: "80vh" }}
      >
        <IconButton className={classes.cancelIcon} onClick={closeHandler}>
          <CancelIcon />
        </IconButton>
        {props.images.length > 1 && (
          <SliderArrow prevHandler={prevHandler} nextHandler={nextHandler} />
        )}

        {props.images.length === 0 && (
          <Box className={classes.loading}>
            <ReactLoading
              className={classes.loadingLogo}
              type="bars"
              color="grey"
              height={100}
              width={100}
            />
          </Box>
        )}

        <Box
          className={classes.imageBox}
          style={{
            width: "50vw",
            height: "100%",

            borderRadius: "10px",
          }}
        >
          {props.images.length > 0 && (
            <LazyLoadImage
              className={classes.itemModalPicture}
              src={props.images[offset].src}
              alt="Image Alt"
              id={props.curItemId}
              onLoad={onImgLoad}
              style={{
                width: dimension.width,
                height: dimension.height,
                paddingLeft: paddingLeft,
                paddingTop: paddingTop,
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
              }}
            ></LazyLoadImage>
          )}
          <SliderDot
            offset={offset}
            currSlideStyle={currSlideStyle}
            images={props.images}
            color={"white"}
          />
        </Box>

        <Box className={classes.editForm}>
          {/* <Link href={`/account/#${props.items[props.curItemId]?.userID}`}> */}
          {props.disableLink && (
            <IconButton>
              <Avatar></Avatar>
            </IconButton>
          )}
          {!props.disableLink && (
            <IconButton
              onClick={() =>
                artistPost(
                  props.items[props.curItemId]?.userID,
                  props.items[props.curItemId]?.username
                )
              }
            >
              <Avatar></Avatar>
            </IconButton>
          )}

          <span style={{ textTransform: "none" }}>
            <span className={classes.itemModalInfoTitle}>
              {props.items[props.curItemId]?.title}
            </span>
            <span
              style={{
                paddingLeft: "100px",
                fontSize: "15px",
                color: "grey",
              }}
            >
              {props.items[props.curItemId]?.medium}
              <span
                style={{
                  paddingLeft: "50px",
                  fontSize: "15px",
                  color: "red",
                }}
              >
                {props.items[props.curItemId]?.sold ? "Sold" : ""}
              </span>
            </span>

            <br />
            <span style={{ paddingRight: "10px" }}>by</span>
            {!props.disableLink && (
              <Link
                onClick={() =>
                  artistPost(
                    props.items[props.curItemId]?.userID,
                    props.items[props.curItemId]?.username
                  )
                }
                color="inherit"
                herf="/account"
              >
                {props.items[props.curItemId]?.username}
              </Link>
            )}
            {props.disableLink && (
              <span>{props.items[props.curItemId]?.username}</span>
            )}
            <span className={classes.price}>
              ${props.items[props.curItemId]?.price}
            </span>
          </span>
          <Divider className={classes.divider} />

          <h4> Description:</h4>
          <p style={{ paddingRight: "10px", color: "grey" }}>
            {props.items[props.curItemId]?.description}
          </p>
          <Divider className={classes.divider} style={{ marginTop: "10rem" }} />

          {!props.items[props.curItemId]?.sold && (
            <div>
              <h4> Delivery Type:</h4>
              <p style={{ paddingRight: "10px", color: "grey" }}>
                {props.items[props.curItemId]?.deliverytype}
              </p>
            </div>
          )}
          <Link
            style={{
              position: "absolute",
              bottom: "0",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() =>
              contactHandler(
                props.items[props.curItemId]?.userID,
                props.items[props.curItemId]?.username
              )
            }
            herf="/contact"
          >
            contact this seller
          </Link>
          {/*
          <Button
            variant="text"
            className={classes.postButton}
            style={{ color: "white" }}
          >
            Add to Chart
          </Button> */}
        </Box>
      </Paper>
    </Modal>
  );
};
export default ItemDetails;
