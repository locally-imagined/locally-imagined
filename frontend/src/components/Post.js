import React, { useState } from "react";
import {
  Button,
  InputBase,
  Modal,
  Paper,
  Divider,
  Dialog,
} from "@material-ui/core";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import UploadIcon from "@mui/icons-material/Upload";
import Menu from "@mui/material/Menu";
import AlertMsg from "./AlertMsg";
import styles from "../styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

const Post = (props) => {
  const classes = styles();
  const [error, setError] = useState(false);
  const [medium, setMedium] = React.useState("");

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
    setMedium(event.target.value);
    props.setArt({
      ...props.art,
      medium: event.target.value,
    });
    console.log(props.art);
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
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };
  return (
    <Modal
      open={props.openPost}
      onClose={() => props.setOpenPost(false)}
      disableEnforceFocus
    >
      <Paper className={classes.signUp}>
        <h1 className={classes.signUpTitle}>Post Your Art</h1>
        <Divider className={classes.divider} />
        <form onSubmit={submitPost}>
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
          <UploadIcon style={{ marginTop: "10px", padding: "2px" }} />

          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            onChange={handlePostChange}
            required
            type="file"
            name="content"
          />

          <Divider className={classes.divider} style={{ marginTop: "20px" }} />
          <Button
            variant="text"
            raised
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
      </Paper>
    </Modal>
  );
};

export default Post;
