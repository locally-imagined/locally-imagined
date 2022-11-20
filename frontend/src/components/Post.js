import React, { useState } from "react";
import {
  Button,
  InputBase,
  Modal,
  Paper,
  Divider,
  IconButton,
  Box,
} from "@material-ui/core";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import UploadIcon from "@mui/icons-material/Upload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AlertMsg from "./AlertMsg";
import styles from "../styles";

import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Post = (props) => {
  const classes = styles();
  const [error, setError] = useState(false);
  const [medium, setMedium] = React.useState("");
  const [url, setUrl] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const mediumOptions = [
    "Painting",
    "Oil",
    "Watercolour",
    "Acrylic",
    "Gouache",
    "Pastel",
    "Encaustic",
    "Fresco",
    "Spray Paint",
    "Digital",
  ];
  const handleMediumChange = (event) => {
    console.log(event.target.value);

    props.setArt({
      ...props.art,
      medium: event.target.value,
    });
    console.log(props.art);
  };

  const prevHandler = () => {
    setOffset((val) => {
      if (val > 0) val--;
      return val;
    });
  };
  const nextHandler = () => {
    setOffset((val) => {
      if (val < url.length - 1) val++;
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
      console.log("img");
      setUrl([...url, URL.createObjectURL(event.target.files[0])]);
      console.log(url);
      getBase64(event.target.files[0])
        .then((result) => {
          result = result.split(",").pop();
          props.art.content.push(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      props.setArt({
        ...props.art,
        [event.target.name]: event.target.value,
      });
    }
    console.log(props.art);
  };

  const submitPost = (event) => {
    event.preventDefault();
    console.log(props.art);
    //   console.log(`title:${props.art.title}
    //   description:${props.art.description}
    //   price:${props.art.price}
    //   medium:${props.art.medium}
    //   content:${props.art.content}
    //  `);

    const token = JSON.parse(sessionStorage.getItem("user")).token;
    console.log("token:", token);
    const body = JSON.stringify(props.art);
    axios
      .post("https://locally-imagined.herokuapp.com/create", body, {
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
          console.log(`res:${res}`);
          props.setOpenPost(false);
          props.setSucess(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err.response.data);
      });
  };
  return (
    <Modal
      open={props.openPost}
      onClose={() => {
        props.setOpenPost(false);
        props.setArt({
          title: "",
          description: "",
          price: "",
          medium: "",
          content: [],
        });
        setUrl("");
      }}
      disableEnforceFocus
    >
      <Box className={classes.postPage}>
        <Box className={classes.postPageDetail}>
          <h1 className={classes.signUpTitle}>Post Your Art</h1>
          <Divider className={classes.divider} />
          <form onSubmit={submitPost} className={classes.PostPage}>
            <InputBase
              className={classes.signUpInput}
              placeholder="Title"
              inputProps={{
                "data-id": "title",
                onChange: handlePostChange,
                required: true,
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
              }}
              type="number"
              name="price"
            />
            <InputLabel>Medium</InputLabel>
            <Select
              value={medium}
              defaultValue=""
              onChange={handleMediumChange}
              label="Medium"
              style={{ width: "100px", height: "40px" }}
            >
              {mediumOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />

            <input
              accept="image/*"
              style={{ display: "none" }}
              multiple
              onChange={handlePostChange}
              required
              id="icon-button-file"
              type="file"
              name="content"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              <span style={{ fontSize: "13px", color: "grey" }}>
                upload one or more images
              </span>
            </label>

            <Divider
              className={classes.divider}
              style={{ marginTop: "20px" }}
            />
            <Button
              variant="text"
              type="submit"
              value="Submit"
              className={classes.postButton}
              style={{ color: "white" }}
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
        </Box>
        <Box className={classes.postPageImageBox}>
          <Box
            style={{
              marginTop: "14rem",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <ArrowBackIcon
              onClick={prevHandler}
              style={{ paddingRight: "39rem" }}
            />
            <ArrowForwardIcon onClick={nextHandler} />
          </Box>

          <LazyLoadImage
            style={{
              height: `35rem`,
              boxShadow: 3,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
              marginLeft: "5rem",
            }}
            src={url[offset]}
            alt="Image Alt"
            effect="blur"
          ></LazyLoadImage>
        </Box>
      </Box>
    </Modal>
  );
};

export default Post;
