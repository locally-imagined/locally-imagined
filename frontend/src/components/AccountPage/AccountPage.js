import React from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import Box from "@mui/material/Box";

import "react-lazy-load-image-component/src/effects/blur.css";

import Items from "../Items";
import styles from "../../styles";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ChangePage from "../ChangePage";
import Edit from "./Edit";
import AlertMsg from "../AlertMsg";
import ReactLoading from "react-loading";
const AccountPage = (props) => {
  const [edit, setEdit] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState(0);
  const [openItemUrl, setOpenItemUrl] = React.useState("");
  const [success, setSuccess] = useState(false);
  const openEditHandler = (index) => {
    setEditId(index);
    console.log(index);
    setOpenItemUrl(props.items[index].url);
    props.getImagesSet(props.items[index].postID);
  };
  const iconHandler = (event) => {};
  const editHandler = () => {
    setEdit("edit");
  };

  const classes = styles();
  if (!props.user.userName) return <h1></h1>;

  return (
    <Box className={classes.accountBox}>
      <br />
      <br />
      <br />
      {success && (
        <AlertMsg
          success={success}
          type={"success"}
          setSucess={setSuccess}
          msg={msg}
        />
      )}
      <Box className={classes.accountBoard}>
        <Typography component={"span"} className={classes.accountBoardDetails}>
          About {props.user.userName} <br />
          <p style={{ fontSize: "15px", color: "grey" }}>
            Joined November 2022
          </p>
          <br />
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Followers
          </span>
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Followings
          </span>
          <span
            style={{ fontSize: "15px", color: "grey", paddingRight: "10px" }}
          >
            {" "}
            0 Favorited
          </span>
        </Typography>

        {edit === "" && (
          <IconButton className={classes.accountIcons} onClick={editHandler}>
            <EditIcon />
          </IconButton>
        )}
        {edit === "edit" && (
          <IconButton
            className={classes.accountIcons}
            onClick={() => setEdit("")}
          >
            <ClearIcon />
          </IconButton>
        )}
        <Box className={classes.accountItems}>
          <h3 style={{ color: "#494a91" }}>{props.user.userName}'s artworks</h3>
          {props.items.length === 0 && (
            <Box className={classes.loading}>
              <ReactLoading type="bars" color="grey" height={100} width={100} />
            </Box>
          )}
          <Items
            items={props.items}
            setOpenEdit={setOpenEdit}
            icon={edit}
            openItemHandler={openEditHandler}
            iconHandler={iconHandler}
            setEditId={setEditId}
          />
          <ChangePage
            setOffset={props.setOffset}
            offset={props.offset}
            items={props.items}
          />
        </Box>
        <Edit
          setOpenEdit={setOpenEdit}
          openEdit={openEdit}
          openItemUrl={openItemUrl}
          editId={editId}
          items={props.items}
          icon={"favorite"}
          images={props.images}
          setImages={props.setImages}
          deleteCheck={props.deleteCheck}
          setDeleteCheck={props.setDeleteCheck}
          setSuccess={setSuccess}
          success={success}
          setMsg={setMsg}
          msg={msg}
        />
      </Box>
    </Box>
  );
};
export default AccountPage;
