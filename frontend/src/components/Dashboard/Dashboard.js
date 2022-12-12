import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles";
import AlertMsg from "../AlertMsg";
import Post from "../Post";
/**
 * Dashboard
 * @return {object} JSX
 */
const Dashboard = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.setCurPath(location.pathname);
    console.log(location.pathname);
  }, []);
  const classes = styles();
  const [success, setSucess] = useState(false);
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
          getAvatar={props.getAvatar}
        />
      </Box>
    </Grid>
  );
};
export default Dashboard;
