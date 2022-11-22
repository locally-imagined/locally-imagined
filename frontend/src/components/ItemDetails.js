import React from "react";
import {
  Button,
  Paper,
  Modal,
  Avatar,
  Divider,
  IconButton,
} from "@material-ui/core";
import Box from "@mui/material/Box";

import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
            <ReactLoading type="bars" color="grey" height={100} width={100} />
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
          />
        </Box>

        <Box className={classes.editForm}>
          <IconButton>
            <Avatar></Avatar>
          </IconButton>
          <span style={{ textTransform: "none" }}>
            <span className={classes.itemModalInfoTitle}>
              {props.items[props.curItemId]?.title}
            </span>

            <br />
            <span style={{ paddingRight: "10px" }}>by</span>
            <span>artist</span>
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
