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
  const scrollOption = {
    top: 60,
    left: 100,
    behavior: "smooth",
  };
  const closeHandler = () => {
    props.setOpenItem(false);
    setOffset(0);
    props.setImages([]);
  };
  const prevHandler = () => {
    setOffset((val) => {
      if (val > 0) val--;
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < props.images.length - 1) val++;
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
  };
  const artistPost = (userID, username) => {
    // console.log(userID);
    // console.log(username);
    props.setArtistItem([]);
    sessionStorage.setItem("currentUserID", userID);
    props.setUserID(userID);
    history.push(`/posts/artistposts/userID:${userID}`);
    window.scrollTo(scrollOption);
  };
  return (
    <Modal open={props.openItem}>
      <Paper className={classes.itemModal}>
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

        <Box className={classes.imageBox}>
          {props.images.length > 0 && (
            <LazyLoadImage
              className={classes.itemModalPicture}
              src={props.images[offset].src}
              alt="Image Alt"
              id={props.curItemId}
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
