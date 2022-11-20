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
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles";

const ItemDetails = (props) => {
  const classes = styles();
  const history = useHistory();
  return (
    <Modal
      open={props.openItem}
      onClose={() => {
        props.setOpenItem(false);
      }}
    >
      <Paper className={classes.itemModal}>
        <LazyLoadImage
          className={classes.itemModalPicture}
          src={props.openItemUrl}
          alt="Image Alt"
          id={props.curItemId}
        ></LazyLoadImage>

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
            <span style={{ float: "right" }}>
              ${props.items[props.curItemId]?.price}
            </span>
          </span>
          <Divider className={classes.divider} />

          <h4> Description:</h4>
          <p style={{ paddingRight: "10px", color: "grey" }}>
            {props.items[props.curItemId]?.description}
          </p>
          <Divider className={classes.divider} style={{ marginTop: "10rem" }} />

          <Button
            variant="text"
            className={classes.postButton}
            style={{ color: "white" }}
          >
            Add to Chart
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
export default ItemDetails;
