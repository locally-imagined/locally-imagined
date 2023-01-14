import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles";
import AlertMsg from "../AlertMsg";
import Post from "./Post";
import "./Dashboard.css";
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
    <div className="dashboard-box">
      <span className="dashboard-alert">
        {success && (
          <AlertMsg
            type={"success"}
            success={success}
            setSucess={setSucess}
            msg={"success"}
          />
        )}
      </span>

      {/*Post modal*/}
      <Post
        openPost={openPost}
        setOpenPost={setOpenPost}
        art={props.art}
        setArt={props.setArt}
        setUserID={props.setUserID}
        setSucess={setSucess}
        getInfo={props.getInfo}
        getAvatar={props.getAvatar}
      />
    </div>
  );
};
export default Dashboard;
