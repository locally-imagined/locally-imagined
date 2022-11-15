import React from "react";
import { Button, Typography, Box, Grid } from "@material-ui/core";
import UploadIcon from "@mui/icons-material/Upload";

import { useState } from "react";
import styles from "../../styles";

import Post from "../Post";
const Dashboard = (props) => {
  const classes = styles();
  const [openPost, setOpenPost] = useState(false);
  return (
    <Grid className={classes.dashboardBox}>
      <Typography className={classes.dashboardTitle}>Dashboard</Typography>
      <Box className={classes.dashboard}>
        <Box className={classes.dashboardUploadBoard}>
          <Typography variant="h4" className={classes.dashboardUploadTitle}>
            Post Your Art
          </Typography>

          <Button
            className={classes.dashboardUploadButton}
            style={{ color: "white" }}
            onClick={() => setOpenPost(true)}
          >
            <UploadIcon />
            Create
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
