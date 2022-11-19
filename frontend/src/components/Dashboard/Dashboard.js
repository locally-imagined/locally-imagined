import React from "react";
import { Button, Typography, Box, Grid } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles";

import Post from "../Post";
const Dashboard = (props) => {
  const history = useHistory();
  const classes = styles();
  const [openPost, setOpenPost] = useState(false);
  return (
    <Grid className={classes.dashboardBox}>
      <Typography className={classes.dashboardTitle}>Dashboard</Typography>
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
            onClick={() => history.push("/account")}
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
      />
    </Grid>
  );
};
export default Dashboard;
