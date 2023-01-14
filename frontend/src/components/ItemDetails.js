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
import Loading from "./UI/Loading";
import "./ItemDetails.css";
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
      console.log(height);
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
    <Modal open={props.openItem} className="bigModal">
      <div className="itemModal">
        {props.images.length === 0 && <Loading />}
        <div className="itemDetails-image-container">
          {props.images.length > 1 && (
            <SliderArrow prevHandler={prevHandler} nextHandler={nextHandler} />
          )}
          {props.images.length > 0 && (
            <img
              src={props.images[offset].src}
              id={props.curItemId}
              onLoad={onImgLoad}
              style={{
                boxSizing: "content-box",
                width: dimension.width,
                height: dimension.height,
                paddingLeft: paddingLeft,
                paddingTop: paddingTop,
              }}
            ></img>
          )}
          <SliderDot
            offset={offset}
            currSlideStyle={currSlideStyle}
            images={props.images}
            color={"white"}
          />
        </div>
        {props.images.length > 0 && (
          <div className="itemDetails-info-container">
            <div className="itemDetails-info-top-container">
              <span className="itemDetails-medium">
                {props.items[props.curItemId]?.medium}
                <span className="itemDetails-sold">
                  {props.items[props.curItemId]?.sold ? "Sold" : ""}
                </span>
              </span>
              <IconButton className="cancelIcon" onClick={closeHandler}>
                <CancelIcon />
              </IconButton>
            </div>
            <div className="itemDetails-info-main-container">
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

              <div className="itemDetails-title-container">
                <span className="itemDetails-title">
                  {props.items[props.curItemId]?.title}
                </span>
              </div>
            </div>
            <div className="itemDetails-info-secondary-container">
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
                  className="itemDetails-username"
                >
                  {props.items[props.curItemId]?.username}
                </Link>
              )}
              {props.disableLink && (
                <span>{props.items[props.curItemId]?.username}</span>
              )}

              <span className="itemDetails-date">
                {`on  ${new Date(
                  props.items[props.curItemId]?.uploadDate
                ).toDateString()}`}
              </span>
              <span className="itemDetails-price">
                ${props.items[props.curItemId]?.price}
              </span>
            </div>
            <div className="itemDetails-info-tertiary-container">
              <Divider className={classes.divider} />

              <div className="itemDetails-description-container">
                <h4 className="itemDetails-info-title"> Description:</h4>
                <p className="itemDetails-description">
                  {props.items[props.curItemId]?.description}
                </p>
              </div>

              <Divider style={{ marginTop: "10rem" }} />

              {!props.items[props.curItemId]?.sold && (
                <div className="itemDetails-info-delivery-container">
                  <h4 className="itemDetails-info-title"> Delivery Type:</h4>
                  <p className="itemDetails-description">
                    {props.items[props.curItemId]?.deliverytype}
                  </p>
                </div>
              )}
              <Link
                className="itemDetails-link"
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
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ItemDetails;
