import React, { useState } from "react";
import { Button, InputBase, Divider, IconButton, Box } from "@material-ui/core";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AlertMsg from "../AlertMsg";
import styles from "../../styles";
import SliderDot from "../UI/SliderDot";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SliderArrow from "../UI/SliderArrow";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Post.css";
/**
 * Post
 * @return {object} JSX
 */
const Post = (props) => {
  const classes = styles();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [medium, setMedium] = React.useState("");
  const [delivery, setDelivery] = React.useState("");
  const [url, setUrl] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [check, setCheck] = useState(false);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [paddingLeft, setPaddingLeft] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const [currSlideStyle, setCurrSlideStyle] = useState({ opacity: "100%" });
  const maxiumImages = 10;

  const mediumOptions = [
    "Drawing",
    "Painting",
    "Photography",
    "Print",
    "Sculpture",
    "Digital",
    "Other",
  ];
  const delivaryOptions = ["Local Delivery", "Shipping", "Pickup"];
  const handleSelectChange = (event) => {
    // console.log(event.target.name);
    event.target.name === "medium"
      ? setMedium(event.target.value)
      : setDelivery(event.target.value);
    props.setArt({
      ...props.art,
      [event.target.name]: event.target.value,
    });
    // console.log(props.art);
  };

  const onImgLoad = ({ target: img }) => {
    console.log(img.naturalWidth, img.naturalHeight);
    let width = "720px",
      height = "560px";
    const middleHeightPx = 280;
    const middleWidthPx = 360;
    if (img.naturalHeight / img.naturalWidth <= 1.1) {
      const ratio = img.naturalWidth / img.naturalHeight;
      // console.log("ratio:", ratio);
      width = "560px";
      height = `${560 * ratio}px`;
      const imgMiddleWidthPx = 560 / 2;
      setPaddingLeft(`${middleWidthPx - imgMiddleWidthPx}px`);
    }
    if (img.naturalHeight / img.naturalWidth > 1.1) {
      const ratio = img.naturalWidth / img.naturalHeight;
      width = 560 * ratio + "px";
      height = "560px";
      const imgMiddleWidthPx = (560 * ratio) / 2;
      setPaddingLeft(`${middleWidthPx - imgMiddleWidthPx}px`);
    }
    if (img.naturalWidth / img.naturalHeight > 1.1) {
      const ratio = img.naturalHeight / img.naturalWidth;
      height = 560 * ratio + "px";
      width = "560px";
      const imgMiddleHeightPx = (560 * ratio) / 2;
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
    props.setOpenPost(false);
    props.setArt({
      title: "",
      description: "",
      price: "",
      medium: "",
      content: [],
    });
    setUrl([]);
    setCheck(false);
  };
  const handleCheck = () => {
    check ? setCheck(false) : setCheck(true);
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
      if (val < url.length - 1) {
        resetPadding();
        val++;
      }
      setCurrSlideStyle({ opacity: "100%" });
      return val;
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
    });
  };
  const handlePostChange = (event) => {
    if (event.target.name === "content") {
      //console.log("img");
      console.log(event.target.files.length);
      var urls = url.map((x) => x);
      for (var i = 0; i < event.target.files.length; i++) {
        urls.push(URL.createObjectURL(event.target.files[i]));
        getBase64(event.target.files[i])
          .then((result) => {
            result = result.split(",").pop();
            props.art.content.push(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setUrl(urls);
    } else {
      props.setArt({
        ...props.art,
        [event.target.name]: event.target.value,
      });
    }
    // console.log(props.art);
  };

  const submitPost = (event) => {
    event.preventDefault();
    const token = JSON.parse(sessionStorage.getItem("user")).token.jwt;
    // console.log("token:", token);
    const body = JSON.stringify(props.art);
    axios
      .post("https://locally-imagined-e6de634a2095.herokuapp.com/posts/create", body, {
        // prettier-ignore
        "content-type": "application/json",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          // console.log(`res:${res}`);
          props.setOpenPost(false);
          props.setSucess(true);
          setMedium("");
          setUrl([]);
          setDelivery("");
          closeHandler();
          const userID = JSON.parse(sessionStorage.getItem("user")).token
            .userID;
          console.log(userID);
          const username = JSON.parse(sessionStorage.getItem("user")).userName;
          console.log(username);
          console.log(props);
          props.setUserID(userID);
          props.getAvatar(
            JSON.parse(sessionStorage.getItem("user"))?.token.profpicID,
            "myAvatar"
          );
          props.getInfo(userID);
          sessionStorage.removeItem("currentUserID");
          sessionStorage.setItem("currentUserID", userID);
          history.push(`/profile/${username}`, {
            userID: userID,
            username: username,
          });
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  return (
    <div className="post-page">
      <div className="post-detail">
        <h1 className="post-title">Post Your Art</h1>
        <Divider className={classes.divider} />
        <form onSubmit={submitPost} className="post-form">
          <InputBase
            className={classes.signUpInput}
            placeholder="Title"
            inputProps={{
              "data-id": "title",
              onChange: handlePostChange,
              required: true,
              maxLength: 30,
            }}
            type="text"
            name="title"
          />
          <InputBase
            className={classes.signUpInput}
            placeholder="Description"
            inputProps={{
              "data-id": "description",
              onChange: handlePostChange,
              required: true,
              maxLength: 300,
            }}
            type="text"
            name="description"
          />
          <InputBase
            className={classes.signUpInput}
            placeholder="Price"
            inputProps={{
              "data-id": "price",
              onChange: handlePostChange,
              required: true,
              maxLength: 6,
            }}
            type="number"
            name="price"
          />
          <InputLabel style={{ marginLeft: "15px" }}>Medium</InputLabel>
          <Select
            value={medium}
            defaultValue=""
            onChange={handleSelectChange}
            label="Medium"
            name="medium"
            required
            className="post-select"
          >
            {mediumOptions.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel style={{ marginLeft: "15px" }}>
            Delivery Options
          </InputLabel>
          <Select
            value={delivery}
            defaultValue=""
            onChange={handleSelectChange}
            label="Delivery"
            name="deliverytype"
            required
            className="post-select"
          >
            {delivaryOptions.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <input
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handlePostChange}
            required
            disabled={url.length === maxiumImages}
            id="icon-button-file"
            type="file"
            name="content"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload pictures"
              component="span"
              disabled={url.length === maxiumImages}
            >
              <PhotoCamera />
            </IconButton>
            <span
              style={{
                fontSize: "13px",
                color: url.length === maxiumImages ? "red" : "grey",
              }}
            >
              {url.length === maxiumImages
                ? "Reached Maximum Images"
                : "Upload Images"}
            </span>
          </label>

          <div>
            <Checkbox checked={check} onChange={handleCheck} />
            <span style={{ fontSize: "12px" }}>
              By checking this box, I agree to share my contact info to buyers
            </span>
          </div>
          <Divider className={classes.divider} style={{ marginTop: "5px" }} />
          <Button
            type="submit"
            value="Submit"
            variant={check ? "text" : "contained"}
            disabled={!check}
            className={classes.postButton}
            style={{ color: "white", marginTop: "1rem" }}
          >
            Post
          </Button>
        </form>
        {error && (
          <AlertMsg
            error={error}
            type={"error"}
            setError={setError}
            msg={"error"}
          />
        )}
      </div>
      <div className="post-image-box">
        <div className="post-image" style={{}}>
          {url.length > 0 && (
            <LazyLoadImage
              onLoad={onImgLoad}
              style={{
                boxSizing: "content-box",
                width: dimension.width,
                height: dimension.height,
                paddingLeft: paddingLeft,
                paddingTop: paddingTop,
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
              }}
              src={url[offset]}
            ></LazyLoadImage>
          )}
          {url.length > 1 && (
            <SliderArrow prevHandler={prevHandler} nextHandler={nextHandler} />
          )}
          <div className="post-dot-box">
            <SliderDot
              offset={offset}
              currSlideStyle={currSlideStyle}
              images={url}
              color={"black"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
