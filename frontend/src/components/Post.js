import React from "react";
import { Button, InputBase, Modal, Paper, Divider } from "@material-ui/core";

import styles from "../styles";

const Post = (props) => {
  const classes = styles();
  const handlePostChange = (event) => {
    if (event.target.name === "imgFile") {
      props.setArt({
        ...props.art,
        [event.target.name]: URL.createObjectURL(event.target.files),
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
    alert(`
    postTitle:${props.art.postTitle}
    postDesc: ${props.art.postDesc}
    imgFile:${props.art.imgFile}`);
  };
  return (
    <Modal open={props.openPost} onClose={() => props.setPost(false)}>
      <Paper className={classes.signUp}>
        <h1 className={classes.signUpTitle}>Post Your Art</h1>
        <Divider className={classes.divider} />
        <form onSubmit={submitPost}>
          <InputBase
            className={classes.signUpInput}
            placeholder="Title"
            inputProps={{
              "data-testid": "title",
              onChange: handlePostChange,
              required: true,
            }}
            type="text"
            name="postTitle"
          />
          <InputBase
            className={classes.signUpInput}
            placeholder="Description"
            inputProps={{
              "data-testid": "description",
              onChange: handlePostChange,
              required: true,
            }}
            type="text"
            name="postDesc"
          />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            onChange={handlePostChange}
            required
            type="file"
            name="imgFile"
          />
          <Divider className={classes.divider} />
          <Button
            variant="text"
            raised
            type="submit"
            value="Submit"
            className={classes.signUpButton}
          >
            Post
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default Post;
