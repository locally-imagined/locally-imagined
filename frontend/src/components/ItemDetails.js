import React from "react";
import {
  Paper,
  Modal,
  Avatar,
  Divider,
  IconButton,
  Link,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import HorizontalScroll from "react-horizontal-scrolling";
import { useHistory } from "react-router-dom";
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
    let width = "720px",
      height = "680px";
    const middleHeightPx = 340;
    const middleWidthPx = 360;

    if (img.naturalHeight / img.naturalWidth > 1.1) {
      const ratio = img.naturalWidth / img.naturalHeight;
      width = 720 * ratio + "px";
      const imgMiddleWidthPx = (720 * ratio) / 2;
      setPaddingLeft(`${middleWidthPx - imgMiddleWidthPx}px`);
    }
    if (img.naturalWidth / img.naturalHeight > 1.1) {
      const ratio = img.naturalHeight / img.naturalWidth;
      height = 680 * ratio + "px";
      const imgMiddleHeightPx = (680 * ratio) / 2;
      setPaddingTop(`${middleHeightPx - imgMiddleHeightPx}px`);
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
  const artistPost = (userID, username, profpicID) => {
    props.setImages([]);
    props.setArtistItem([]);
    sessionStorage.setItem("currentUserID", userID);
    props.setUserID(userID);
    props.getInfo(userID);
    props.getAvatar(profpicID, "otherAvatar");
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
    props.getInfo(userID);
    history.push(`/contact/${username}`, {
      userID: userID,
      username: username,
    });
  };
  return (
    <Modal open={props.openItem} className={classes.bigModal}>
      <Paper
        className={classes.itemModal}
        style={{ width: "1150px", height: "680px" }}
      >
        <IconButton className={classes.cancelIcon} onClick={closeHandler}>
          <CancelIcon />
        </IconButton>
        {props.images.length > 1 && (
          <SliderArrow
            marginLeft={"620px"}
            prevHandler={prevHandler}
            nextHandler={nextHandler}
          />
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
            width: "720px",
            height: "680px",
            borderRadius: "10px",
          }}
        >
          {props.images.length > 0 && (
            <img
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
            ></img>
          )}
          <SliderDot
            offset={offset}
            currSlideStyle={currSlideStyle}
            images={props.images}
            color={"white"}
          />
        </Box>
        {props.images.length > 0 && (
          <Box className={classes.editForm}>
            {/* <Link href={`/account/#${props.items[props.curItemId]?.userID}`}> */}
            {props.disableLink && (
              <IconButton>
                <Avatar src={props.avatar}></Avatar>
              </IconButton>
            )}
            {!props.disableLink && (
              <IconButton
                data-testid={`user-avatar`}
                onClick={() =>
                  artistPost(
                    props.items[props.curItemId]?.userID,
                    props.items[props.curItemId]?.username,
                    props.items[props.curItemId]?.profpicID
                  )
                }
              >
                <Avatar src={props.avatar}></Avatar>
              </IconButton>
            )}

            <span style={{ textTransform: "none" }}>
              <div
                style={{
                  position: "absolute",
                  marginTop: "-2rem",
                  marginLeft: "4rem",
                  width: "80%",
                  height: "8rem",
                  wordWrap: "break-word",
                }}
              >
                <span
                  className={classes.itemModalInfoTitle}
                  style={{
                    MozHyphens: "auto",
                    msHyphens: "auto",
                    hyphens: "auto",
                  }}
                >
                  {props.items[props.curItemId]?.title}
                </span>
              </div>

              <span
                style={{
                  paddingLeft: "100px",
                  fontSize: "15px",
                  color: "grey",
                  float: "right",
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
              <span
                style={{
                  paddingLeft: "10px",
                  paddingTop: "2px",
                  color: "grey",
                  position: "absolute",
                  fontSize: "12px",
                }}
              >
                {`on  ${new Date(
                  props.items[props.curItemId]?.uploadDate
                ).toDateString()}`}
              </span>
              <span className={classes.price}>
                ${props.items[props.curItemId]?.price}
              </span>
            </span>
            <Divider className={classes.divider} />

            <h4> Description:</h4>
            <div
              style={{
                position: "absolute",
                marginTop: "-1rem",
                width: "80%",
                height: "8rem",
                wordWrap: "break-word",
              }}
            >
              <p
                style={{
                  paddingLeft: "10px",
                  color: "grey",
                  MozHyphens: "auto",
                  msHyphens: "auto",
                  hyphens: "auto",
                }}
              >
                {props.items[props.curItemId]?.description}
              </p>
            </div>

            <Divider
              className={classes.divider}
              style={{ marginTop: "10rem" }}
            />

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
                bottom: "10px",
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
          </Box>
        )}
      </Paper>
    </Modal>
  );
};
export default ItemDetails;
