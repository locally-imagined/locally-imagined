import React from "react";
import { Button, Typography, Box, Grid } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../../styles";
import AlertMsg from "../AlertMsg";
import Post from "../Post";
const Dashboard = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.setCurPath(location.pathname);
    console.log(location.pathname);
  }, []);
  const classes = styles();
  const [success, setSucess] = useState(false);
  const accountHandler = () => {
    props.setSearch("");
    const userID = JSON.parse(sessionStorage.getItem("user")).token.userID;
    const username = JSON.parse(sessionStorage.getItem("user")).userName;
    //console.log(username);
    props.setUserID(userID);
    sessionStorage.removeItem("currentUserID");
    sessionStorage.setItem("currentUserID", userID);
    history.push(`/posts/artistposts/userID:${userID}`);
  };
  const [openPost, setOpenPost] = useState(false);
  return (
    <Grid className={classes.dashboardBox} style={{ marginTop: "3rem" }}>
      <span
        style={{
          marginTop: "5px",
          width: "100vw",
          position: "absolute",
          zIndex: 1,
        }}
      >
        {success && (
          <AlertMsg
            type={"success"}
            success={success}
            setSucess={setSucess}
            msg={"success"}
          />
        )}
      </span>

      <Box>
        {/*Post modal*/}
        <Post
          openPost={openPost}
          setOpenPost={setOpenPost}
          art={props.art}
          setArt={props.setArt}
          setUserID={props.setUserID}
          setSucess={setSucess}
          getInfo={props.getInfo}
          getMyAvatar={props.getMyAvatar}
        />
      </Box>
    </Grid>
  );
};
export default Dashboard;
