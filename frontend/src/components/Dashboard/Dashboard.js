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
      {success && (
        <AlertMsg
          type={"success"}
          success={success}
          setSucess={setSucess}
          msg={"success"}
        />
      )}
      <Box className={classes.dashboard}>
        <Box className={classes.dashboardBoard}>
          <Typography variant="h5" className={classes.dashboardTitle}>
            Post Your Art
          </Typography>

          <Button
            className={classes.dashboardButton}
            style={{ color: "white" }}
            onClick={() => setOpenPost(true)}
          >
            <UploadIcon />
            Create
          </Button>
        </Box>
        <Box className={classes.dashboardBoard}>
          <Typography variant="h5" className={classes.dashboardTitle}>
            Edit Your Art
          </Typography>

          <Button
            className={classes.dashboardButton}
            style={{ color: "white" }}
            onClick={accountHandler}
          >
            <EditIcon />
            Edit
          </Button>
        </Box>
      </Box>

      {/*Post modal*/}
      <Post
        openPost={openPost}
        setOpenPost={setOpenPost}
        art={props.art}
        setArt={props.setArt}
        setSucess={setSucess}
      />
    </Grid>
  );
};
export default Dashboard;
