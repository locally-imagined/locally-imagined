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
const AccountPage = (props) => {
  const [edit, setEdit] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [openItemUrl, setOpenItemUrl] = React.useState("");
  const openEditHandler = (index) => {
    setEditId(index);
    console.log(index);
    setOpenItemUrl(props.items[index].url);
  };
  const iconHandler = (event) => {};
  const editHandler = () => {
    setEdit("edit");
  };

  const classes = styles();
  if (!props.user.userName) return <h1></h1>;

  return (
    <Box className={classes.accountBox}>
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
        />
      </Box>
    </Box>
  );
};
export default AccountPage;
