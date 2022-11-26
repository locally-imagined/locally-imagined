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
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../../styles";
import { useState } from "react";
import ReactLoading from "react-loading";
import CancelIcon from "@mui/icons-material/Cancel";

import DeleteIcon from "@mui/icons-material/Delete";
import AlertMsg from "../AlertMsg";
import axios from "axios";
import SliderArrow from "../UI/SliderArrow";
import SliderDot from "../UI/SliderDot";

const Edit = (props) => {
  const classes = styles();
  const token = JSON.parse(sessionStorage.getItem("user")).token;
  const [medium, setMedium] = React.useState("");
  const [delivery, setDelivery] = React.useState("");
  const [sold, setSold] = React.useState(false);
  const [error, setError] = useState(false);
  const [currSlideStyle, setCurrSlideStyle] = useState({ opacity: "100%" });
  const [check, setCheck] = useState(false);
  const [offset, setOffset] = useState(0);
  const mediumOptions = ["Painting", "Oil", "Watercolour", "Digital", "Other"];
  const delivaryOptions = ["Local Delivery", "Shipping", "Pickup"];
  const soldOptions = ["true", "false"];

  const scrollOption = {
    top: 60,
    left: 100,
    behavior: "smooth",
  };
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
    medium: "",
    sold: false,
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
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
    if (props.deleteCheck[curOffset]) setCheck(true);
    else setCheck(false);
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < props.images.length - 1) val++;
      curOffset = val;
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
    if (props.deleteCheck[curOffset]) setCheck(true);
    else setCheck(false);
  };

  const deleteHandler = () => {
    setDeleteArt(true);
  };
  const handleSelectChange = (event) => {
    if (event.target.name === "medium") setMedium(event.target.value);
    if (event.target.name === "deliverytype") setDelivery(event.target.value);
    if (event.target.name === "sold") setSold(event.target.value);
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
    console.log(edit);
  };

  const handleEditChange = (event) => {
    console.log(event.target.name);
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
          window.scrollTo(scrollOption);
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
    const mediumQuery = edit.medium ? `medium=${edit.medium}` : "";
    const soldQuery = edit.sold ? `sold=${edit.sold}` : "";
    const deliveryQuery = edit.deliverytype
      ? `deliverytype=${edit.deliverytype}`
      : "";
    console.log(
      baseUrl,
      titleQuery,
      priceQuery,
      descriptionQuery,
      deliveryQuery
    );
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
      (titleQuery || descriptionQuery || priceQuery) && mediumQuery
        ? `&${mediumQuery}`
        : mediumQuery
    }${
      (titleQuery || descriptionQuery || priceQuery || mediumQuery) && soldQuery
        ? `&${soldQuery}`
        : soldQuery
    }${
      (titleQuery ||
        descriptionQuery ||
        priceQuery ||
        mediumQuery ||
        soldQuery) &&
      deliveryQuery
        ? `&${deliveryQuery}`
        : deliveryQuery
    }${
      (titleQuery ||
        descriptionQuery ||
        priceQuery ||
        mediumQuery ||
        soldQuery ||
        deliveryQuery) &&
      imageQuery
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

          window.scrollTo(scrollOption);
          //window.location.reload(false);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <Modal open={props.openEdit} disableEnforceFocus>
      <Paper className={classes.itemModal}>
        <IconButton className={classes.cancelIcon} onClick={closeEditHandler}>
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
              id={props.editId}
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
                onChange: handleEditChange,
              }}
              type="text"
              name="title"
            />{" "}
            <InputBase
              className={classes.signUpInput}
              placeholder="Description"
              defaultValue={props.items[props.editId]?.description}
              inputProps={{
                "data-id": "description",
                onChange: handleEditChange,
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
                onChange: handleEditChange,
              }}
              type="number"
              name="price"
            />
            <InputLabel>Medium</InputLabel>
            <Select
              value={medium}
              defaultValue={props.items[props.editId]?.medium}
              onChange={handleSelectChange}
              label="Medium"
              name="medium"
              style={{ width: "150px", height: "40px" }}
            >
              {mediumOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>Delivery Options</InputLabel>
            <Select
              value={delivery}
              defaultValue=""
              onChange={handleSelectChange}
              label="Delivery"
              name="deliverytype"
              style={{ width: "150px", height: "40px" }}
            >
              {delivaryOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {props.images.length > 1 && (
              <span style={{ paddingLeft: "10px" }}>
                Delete picture {offset + 1}?
                <Checkbox checked={check} onChange={checkHandler}></Checkbox>
              </span>
            )}
            <InputLabel>Sold</InputLabel>
            <Select
              value={sold}
              defaultValue={
                props.items[props.editId]?.sold
                  ? soldOptions[0]
                  : soldOptions[1]
              }
              onChange={handleSelectChange}
              label="Sold"
              name="sold"
              style={{ width: "150px", height: "40px" }}
            >
              {soldOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <span style={{ paddingLeft: "5px" }}> Delete Post</span>
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
            <Divider
              className={classes.divider}
              style={{ marginTop: "20px" }}
            />
            {!deleteArt && (
              <Button
                variant="text"
                type="submit"
                value="Submit"
                className={classes.postButton}
                style={{ color: "white", marginTop: "1rem" }}
                onClick={() => submitChange()}
              >
                Save Changes
              </Button>
            )}
            {deleteArt && (
              <Container className={classes.deletePrompt}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
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
          </form>
        </Box>
      </Paper>
    </Modal>
  );
};
export default Edit;
