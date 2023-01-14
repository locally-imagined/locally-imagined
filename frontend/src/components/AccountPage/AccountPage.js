import React from "react";
import { Typography, Avatar, Divider } from "@material-ui/core";
import Box from "@mui/material/Box";
import "react-lazy-load-image-component/src/effects/blur.css";
import Items from "../Items";
import styles from "../../styles";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChangePage from "../ChangePage";
import Edit from "./Edit";
import AlertMsg from "../AlertMsg";
import ReactLoading from "react-loading";
import ItemDetails from "../ItemDetails";
import Loading from "../UI/Loading";
import AboutBar from "../AboutPage/AboutBar";
import "./AccountPage.css";
/**
 * AccountPage
 *
 * @return {object} JSX
 */
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
      props.getAvatar(sessionStorage.getItem("myAvatar"), "myAvatar");
    else props.getAvatar(sessionStorage.getItem("currAvatar"), "otherAvatar");
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
    props.getAvatar(props.artistItem[id].profpicID, "otherAvatar");
  };
  const openEditHandler = (index) => {
    setEditId(index);
    // console.log(index);
    setOpenItemUrl(props.artistItem[index].url);
    props.getImagesSet(props.artistItem[index].postID);
  };
  const iconHandler = (event) => {};
  const editHandler = () => {
    setEdit("edit");
  };

  const classes = styles();

  return (
    <div className="account-page">
      <div className="account-board">
        <div className="account-board-basic-info">
          <Avatar
            className="account-board-avatar"
            src={
              location.state.username ===
              JSON.parse(sessionStorage.getItem("user"))?.userName
                ? props.myAvatar
                : props.avatar
            }
          >
            {location.state.username[0]}
          </Avatar>
          <span className="account-board-username">
            {location.state.username}
          </span>
        </div>

        <div className="account-board-bio">{props.contact.bio}</div>
      </div>
      <div>
        <Divider />
      </div>
      {props.artistItem[0] && (
        <h3 className="account-title">{username}'s Art</h3>
      )}

      <div className="account-items">
        {props.loading && <Loading />}

        {props.noResult && (
          <Typography variant="h5" className="no-result">
            No Results
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
          contact={props.contact}
          user={props.user}
        />
      </div>
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
    </div>
  );
};
export default AccountPage;
