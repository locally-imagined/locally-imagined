import React from "react";
import {
  Container,
  Button,
  Paper,
  Modal,
  InputBase,
  Divider,
  IconButton,
  TextField,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../../styles";
import { useState } from "react";
import ReactLoading from "react-loading";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertMsg from "../AlertMsg";
import axios from "axios";

const Edit = (props) => {
  const classes = styles();
  const token = JSON.parse(sessionStorage.getItem("user")).token;
  const [error, setError] = useState(false);

  const [check, setCheck] = useState(false);
  const [offset, setOffset] = useState(0);
  const handleDeleteCheckChange = (id) => {
    const updateArr = props.deleteCheck;
    updateArr[id] = updateArr[id] ? false : true;
    props.setDeleteCheck(updateArr);
    console.log(updateArr);
  };

  const [deleteArt, setDeleteArt] = useState(false);
  const [edit, setEdit] = useState({
    title: "",
    description: "",
    price: "",
  });

  let curOffset;
  const closeEditHandler = () => {
    props.setOpenEdit(false);
    setOffset(0);
    props.setImages([]);
    setEdit({ title: "", description: "", price: "", delete: "" });
    setCheck(false);
    props.setDeleteCheck([]);
  };
  const checkHandler = () => {
    check ? setCheck(false) : setCheck(true);
    handleDeleteCheckChange(offset);
  };
  const prevHandler = () => {
    setOffset((val) => {
      if (val > 0) val--;
      curOffset = val;
      return val;
    });
    if (props.deleteCheck[curOffset]) setCheck(true);
    else setCheck(false);
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < props.images.length - 1) val++;
      curOffset = val;
      return val;
    });
    if (props.deleteCheck[curOffset]) setCheck(true);
    else setCheck(false);
  };

  const deleteHandler = () => {
    setDeleteArt(true);
  };
  const handlePostChange = (event) => {
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
    console.log(edit);
  };

  const deleteArtHandler = () => {
    console.log("delete:", props.items[props.editId].imageIDs[0]);
    console.log("Token:", token);
    const deleteArr = [];
    props.deleteCheck.forEach((val, index) => {
      if (val) {
        deleteArr.push(props.images[index]);
      }
    });
    console.log(deleteArr);
    axios
      .delete(
        `https://locally-imagined.herokuapp.com/posts/delete/${
          props.items[props.editId].postID
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status !== 204) {
          throw res;
        } else {
          console.log(`res:${res}`);
          props.setSuccess(true);
          props.setMsg("deleted");
          props.setOpenEdit(false);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setError(true);
        setDeleteArt(false);
        console.log(err);
      });
  };
  const queryUrlFormater = (deleteArr) => {
    const baseUrl = `https://locally-imagined.herokuapp.com/posts/edit/${
      props.items[props.editId].postID
    }?`;
    const titleQuery = edit.title ? `title=${edit.title}` : "";
    const priceQuery = edit.price ? `price=${edit.price}` : "";
    const descriptionQuery = edit.description
      ? `description=${edit.description}`
      : "";
    console.log(baseUrl, titleQuery, priceQuery, descriptionQuery);
    console.log(edit);
    const imageQuery =
      deleteArr.length > 0
        ? deleteArr
            .map((img, index) => `${index > 0 ? "&" : ""}imageID=${img}`)
            .join("")
        : "";
    console.log(imageQuery);

    const url = `${baseUrl}${titleQuery}${
      titleQuery && descriptionQuery ? `&${descriptionQuery}` : descriptionQuery
    }${
      (titleQuery || descriptionQuery) && priceQuery
        ? `&${priceQuery}`
        : priceQuery
    }${
      (titleQuery || descriptionQuery || priceQuery) && imageQuery
        ? `&${imageQuery}`
        : imageQuery
    }`;
    return url === baseUrl ? "" : url;
  };

  const submitChange = (event) => {
    event.preventDefault();
    const deleteArr = [];
    props.deleteCheck.forEach((val, index) => {
      if (val) {
        deleteArr.push(props.images[index].imageId);
      }
    });
    console.log(deleteArr);
    const url = queryUrlFormater(deleteArr);
    if (!url) {
      console.log("no changes");
      return;
    }
    console.log("Token:", token);
    console.log("URL:", url);
    console.log("URL Encoded:", encodeURIComponent(url));
    axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          console.log(`res:${res}`);
          props.setSuccess(true);
          props.setMsg("edited");
          props.setOpenEdit(false);
          //window.location.reload(false);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <Modal open={props.openEdit} onClose={closeEditHandler}>
      <Paper className={classes.itemModal}>
        <Box
          style={{
            marginTop: "15rem",
            position: "absolute",
            zIndex: 1,
            color: "white",
          }}
        >
          <IconButton onClick={prevHandler}>
            <ArrowBackIcon className={classes.arrow} />
          </IconButton>
          <IconButton style={{ marginLeft: "43vw" }} onClick={nextHandler}>
            <ArrowForwardIcon className={classes.arrow} />
          </IconButton>
        </Box>
        {props.images.length === 0 && (
          <Box className={classes.loading}>
            <ReactLoading type="bars" color="grey" height={100} width={100} />
          </Box>
        )}
        {props.images.length > 0 && (
          <LazyLoadImage
            className={classes.itemModalPicture}
            src={props.images[offset].src}
            alt="Image Alt"
            id={props.editId}
          ></LazyLoadImage>
        )}

        <Box className={classes.editForm}>
          <span className={classes.title} style={{ padding: "2rem" }}>
            Edit
          </span>
          <Divider className={classes.divider} />

          <form onSubmit={submitChange}>
            <InputBase
              className={classes.signUpInput}
              placeholder={"Title"}
              defaultValue={props.items[props.editId]?.title}
              inputProps={{
                "data-id": "title",
                onChange: handlePostChange,
              }}
              type="text"
              name="title"
            />
            <InputBase
              className={classes.signUpInput}
              placeholder="Description"
              defaultValue={props.items[props.editId]?.description}
              inputProps={{
                "data-id": "description",
                onChange: handlePostChange,
              }}
              type="text"
              name="description"
            />
            <InputBase
              className={classes.signUpInput}
              placeholder="Price"
              defaultValue={props.items[props.editId]?.price}
              inputProps={{
                "data-id": "price",
                onChange: handlePostChange,
              }}
              type="number"
              name="price"
            />

            {props.images.length > 1 && (
              <span>
                Delete picture {offset + 1}?
                <Checkbox checked={check} onChange={checkHandler}></Checkbox>
              </span>
            )}
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
                Are you sure to delete this post?
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
