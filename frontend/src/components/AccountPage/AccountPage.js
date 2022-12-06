import React from "react";
import {
  Typography,
  Grid,
  IconButton,
  Avatar,
  Divider,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import "react-lazy-load-image-component/src/effects/blur.css";
import Items from "../Items";
import styles from "../../styles";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ChangePage from "../ChangePage";
import Edit from "./Edit";
import AlertMsg from "../AlertMsg";
import ReactLoading from "react-loading";
import ItemDetails from "../ItemDetails";
const AccountPage = (props) => {
  const location = useLocation();
  const paraUser = useParams();

  const username =
    paraUser === JSON.parse(sessionStorage.getItem("user"))?.userName
      ? JSON.parse(sessionStorage.getItem("user")).userName
      : props.artistItem[0]?.username;

  useEffect(() => {
    props.setCurPath(location.pathname);
    props.getInfo(location.state.userID);
    props.setUserID(location.state.userID);
    if (
      location.state.username ===
      JSON.parse(sessionStorage.getItem("user"))?.userName
    )
      props.getMyAvatar(sessionStorage.getItem("myAvatar"));
    else props.getAvatar(sessionStorage.getItem("currAvatar"));
  }, [location.state.username]);

  const [edit, setEdit] = useState("edit");
  const [openEdit, setOpenEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState(0);
  const [openItemUrl, setOpenItemUrl] = React.useState("");
  const [success, setSuccess] = useState(false);
  const [openItem, setOpenItem] = React.useState(false);
  const [curItemId, setCurItemId] = React.useState(0);

  const openItemHandler = (id) => {
    setOpenItem(true);
    props.getImagesSet(props.artistItem[id].postID);
    setOpenItemUrl(props.artistItem[id].url);
    setCurItemId(id);
    props.getAvatar(props.artistItem[id].profpicID);
  };
  const openEditHandler = (index) => {
    setEditId(index);
    // console.log(index);
    setOpenItemUrl(props.artistItem[index].url);
    props.getImagesSet(props.artistItem[index].postID);
  };
  const iconHandler = (event) => {};

  const classes = styles();

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
      <Box
        className={classes.accountBoard}
        style={{
          width: "80vw",
          borderRadius: "10px",
          position: "absolute",
          marginLeft: "10vw",
        }}
      >
        <Typography component={"span"} className={classes.accountBoardDetails}>
          <span
            style={{
              marginLeft: "10px",
              marginTop: "-10px",
              position: "absolute",
            }}
          >
            <Avatar
              className={classes.avatar}
              style={{ width: 60, height: 60 }}
              src={
                location.state.username ===
                JSON.parse(sessionStorage.getItem("user"))?.userName
                  ? props.myAvatar
                  : props.avatar
              }
            >
              {location.state.username[0]}
            </Avatar>
          </span>
          <span style={{ marginLeft: "100px" }}>{location.state.username}</span>
          <br />
          <br />
          <span
            style={{
              fontSize: "15px",
              color: "grey",
              paddingRight: "10px",
            }}
          >
            {props.contact.bio}
          </span>
        </Typography>
      </Box>

      <Box className={classes.accountItems}>
        {props.artistItem[0] && (
          <h3 style={{ color: "#494a91" }}>{username}'s artworks</h3>
        )}
        {props.loading && (
          <Box
            className={classes.loading}
            style={{ marginLeft: "30vw", height: "100vh" }}
          >
            <ReactLoading type="bars" color="grey" height={100} width={100} />
          </Box>
        )}

        {props.noResult && (
          <Typography
            variant="h5"
            style={{
              marginLeft: "45%",
              color: " grey",
              paddingTop: "10vw",
              paddingBottom: "100vh",
            }}
          >
            No result
          </Typography>
        )}

        <Items
          items={props.artistItem}
          setOpenEdit={setOpenEdit}
          icon={edit}
          openEditHandler={openEditHandler}
          openItemHandler={openItemHandler}
          iconHandler={iconHandler}
          setEditId={setEditId}
        />

        <ChangePage
          setOffset={props.setOffset}
          offset={props.offset}
          items={props.artistItem}
        />
      </Box>
      <Edit
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        openItemUrl={openItemUrl}
        editId={editId}
        items={props.artistItem}
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
      <ItemDetails
        openItem={openItem}
        setOpenItem={setOpenItem}
        openItemUrl={openItemUrl}
        curItemId={curItemId}
        items={props.artistItem}
        images={props.images}
        setImages={props.setImages}
        disableLink={true}
        setUserID={props.setUserID}
        getInfo={props.getInfo}
        avatar={props.avatar}
        setAvatar={props.setAvatar}
      />
    </Box>
  );
};
export default AccountPage;
