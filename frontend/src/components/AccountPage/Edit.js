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

  const [medium, setMedium] = React.useState("");
  const [delivery, setDelivery] = React.useState("");
  const [sold, setSold] = React.useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [msg, setMsg] = useState("");
  const [currSlideStyle, setCurrSlideStyle] = useState({ opacity: "100%" });
  const [check, setCheck] = useState(false);
  const [offset, setOffset] = useState(0);
  const mediumOptions = ["Painting", "Oil", "Watercolour", "Digital", "Other"];
  const delivaryOptions = ["Local Delivery", "Shipping", "Pickup"];
  const soldOptions = ["true", "false"];
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
    let width = "720px",
      height = "680px";
    const middleHeightPx = 340;
    const middleWidthPx = 360;

    if (img.naturalHeight / img.naturalWidth > 1.1) {
      const ratio = img.naturalWidth / img.naturalHeight;
      // console.log("ratio:", ratio);
      width = 720 * ratio + "px";
      const imgMiddleWidthPx = (720 * ratio) / 2;
      // console.log("imgMiddleWidthPx:", imgMiddleWidthPx);
      setPaddingLeft(`${middleWidthPx - imgMiddleWidthPx}px`);
    }
    if (img.naturalWidth / img.naturalHeight > 1.1) {
      const ratio = img.naturalHeight / img.naturalWidth;
      // console.log("ratio:", ratio);
      height = 680 * ratio + "px";
      const imgMiddleHeightPx = (680 * ratio) / 2;
      // console.log("imgMiddleHeightPx:", imgMiddleHeightPx);
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
  const handleDeleteCheckChange = (id) => {
    const updateArr = props.deleteCheck;
    updateArr[id] = updateArr[id] ? false : true;
    props.setDeleteCheck(updateArr);
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
    resetPadding();
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
      if (val > 0) {
        resetPadding();
        val--;
      }
      curOffset = val;
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
    if (props.deleteCheck[curOffset]) setCheck(true);
    else setCheck(false);
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < props.images.length - 1) {
        resetPadding();
        val++;
      }
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
    // console.log(edit);
  };

  const handleEditChange = (event) => {
    console.log(event.target.name);
    setEdit({
      ...edit,
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value);
    // console.log(edit);
  };

  const deleteArtHandler = () => {
    const token = JSON.parse(sessionStorage.getItem("user")).token.jwt;
    // console.log("delete:", props.items[props.editId].imageIDs[0]);
    // console.log("Token:", token);
    const deleteArr = [];
    props.deleteCheck.forEach((val, index) => {
      if (val) {
        deleteArr.push(props.images[index]);
      }
    });
    // console.log(deleteArr);
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
        console.error(err);
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
    // console.log(
    //   baseUrl,
    //   titleQuery,
    //   priceQuery,
    //   descriptionQuery,
    //   deliveryQuery
    // );
    // console.log(edit);
    const imageQuery =
      deleteArr.length > 0
        ? deleteArr
            .map((img, index) => `${index > 0 ? "&" : ""}imageID=${img}`)
            .join("")
        : "";
    // console.log(imageQuery);

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
    const token = JSON.parse(sessionStorage.getItem("user")).token.jwt;
    const deleteArr = [];
    props.deleteCheck.forEach((val, index) => {
      if (val) {
        deleteArr.push(props.images[index].imageId);
      }
    });
    if (deleteArr.length === props.images.length) {
      setInfo(true);
      setMsg("can not delete");
      return;
    }
    // console.log(deleteArr);
    const url = queryUrlFormater(deleteArr);
    if (!url) {
      setInfo(true);
      setMsg("no changes");
      return;
    }
    // console.log("Token:", token);
    // console.log("URL:", url);
    // console.log("URL Encoded:", encodeURIComponent(url));
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
          // console.log(`res:${res}`);
          props.setSuccess(true);
          props.setMsg("edited");
          props.setOpenEdit(false);

          window.scrollTo(scrollOption);
          //window.location.reload(false);
        }
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  };

  return (
    <Modal open={props.openEdit} disableEnforceFocus>
      <Paper
        className={classes.itemModal}
        style={{ width: "1150px", height: "680px" }}
      >
        <IconButton className={classes.cancelIcon} onClick={closeEditHandler}>
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
            width: "720px",
            height: "680px",

            borderRadius: "10px",
          }}
        >
          {props.images.length > 0 && (
            <LazyLoadImage
              src={props.images[offset].src}
              alt="Image Alt"
              id={props.editId}
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
            {info && (
              <AlertMsg info={info} type={"info"} setInfo={setInfo} msg={msg} />
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
