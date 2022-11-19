import React from "react";
import {
  Container,
  Button,
  Paper,
  Modal,
  InputBase,
  Divider,
  IconButton,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../../styles";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import AlertMsg from "../AlertMsg";
import axios from "axios";

const Edit = (props) => {
  const classes = styles();
  const [error, setError] = useState(false);
  const [deleteArt, setDeleteArt] = useState(false);
  const [edit, setEdit] = useState({
    title: "",
    description: "",
    price: "",
    delete: "",
  });
  const token = JSON.parse(sessionStorage.getItem("user")).token;
  const deleteHandler = () => {
    setDeleteArt(true);
  };
  const handlePostChange = (event) => {
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const deleteArtHandler = () => {
    console.log("delete:", props.items[props.editId].imageIDs[0]);
    console.log("Token:", token);
    axios
      .delete(
        `https://locally-imagined.herokuapp.com/delete/${
          props.items[props.editId].imageIDs[0]
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          console.log(`res:${res}`);
        }
      })
      .catch((err) => {
        setError(true);
        setDeleteArt(false);
        console.log(err);
      });
  };

  const submitChange = (event) => {
    event.preventDefault();
    const url = `https://locally-imagined.herokuapp.com/edit/8c8cc754-41c3-4ab3-8acf-b2f0c6a1bdf3?title=${
      edit.title
    }&imageID=${props.items[props.editId].imageIDs[0]}`;
    console.log("Token:", token);
    console.log("URL:", url);
    axios
      .put(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          console.log(`res:${res}`);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <Modal
      open={props.openEdit}
      onClose={() => {
        props.setOpenEdit(false);
      }}
    >
      <Paper className={classes.itemModal}>
        <LazyLoadImage
          className={classes.itemModalPicture}
          src={props.openItemUrl}
          alt="Image Alt"
          id={props.editId}
        ></LazyLoadImage>

        <Box className={classes.editForm}>
          <span className={classes.title} style={{ padding: "2rem" }}>
            Edit
          </span>
          <Divider className={classes.divider} />

          <form onSubmit={submitChange}>
            <InputBase
              className={classes.signUpInput}
              placeholder="Title"
              inputProps={{
                "data-id": "title",
                onChange: handlePostChange,
              }}
              type="text"
              name="title"
            />

            <Divider
              className={classes.divider}
              style={{ marginTop: "20px" }}
            />
            <Button
              variant="text"
              type="submit"
              value="Submit"
              className={classes.postButton}
              style={{ color: "white", marginTop: "10rem" }}
              onClick={() => submitChange(event)}
            >
              Save Changes
            </Button>
            <IconButton onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
            {error && (
              <AlertMsg
                error={error}
                type={"error"}
                setError={setError}
                msg={"error"}
              />
            )}
          </form>
          {deleteArt && (
            <Container className={classes.deletePrompt}>
              <div style={{ fontWeight: "bold" }}>
                Are you sure to delete this art?
              </div>
              <br />
              <div>
                <button onClick={deleteArtHandler}>Yes</button>
                <button
                  style={{ marginLeft: "50px" }}
                  onClick={() => setDeleteArt(false)}
                >
                  Cancel
                </button>
              </div>
            </Container>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};
export default Edit;