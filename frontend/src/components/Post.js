import React, { useState } from "react";
import { Button, InputBase, Modal, Paper, Divider } from "@material-ui/core";

import UploadIcon from "@mui/icons-material/Upload";

import AlertMsg from "./AlertMsg";
import styles from "../styles";
import axios from "axios";

const Post = (props) => {
  const classes = styles();
  const [error, setError] = useState(false);

  const handlePostChange = (event) => {
    event.target.name === "content"
      ? props.setArt({
          ...props.art,
          [event.target.name]: event.target.files[0],
        })
      : props.setArt({
          ...props.art,
          [event.target.name]: event.target.value,
        });

    //console.log(props.art);
  };

  const submitPost = (event) => {
    event.preventDefault();
    alert(`title:${props.art.title}
    description:${props.art.description}
    price:${props.art.price}
    content:${props.art.content}`);

    const token = JSON.parse(sessionStorage.getItem("user")).token;
    console.log("token:", token);
    const body = JSON.stringify(props.art);
    axios
      .post("https://locally-imagined.herokuapp.com/create", body, {
        // prettier-ignore

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
    <Modal open={props.openPost} onClose={() => props.setOpenPost(false)}>
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
