import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "../styles";
import { useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "./UI/Loading";
const ContactInfo = (props) => {
  const classes = styles();
  const location = useLocation();
  const history = useHistory();
  const username = sessionStorage.getItem("currentUsername");

  useEffect(() => {
    props.getInfo(location.state?.userID);
    if (
      location.state.username ===
      JSON.parse(sessionStorage.getItem("user"))?.userName
    )
      props.getAvatar(sessionStorage.getItem("myAvatar"), "myAvatar");
    else {
      props.getAvatar(sessionStorage.getItem("currAvatar"), "otherAvatar");
    }
  }, []);
  return (
    <Box className="contact-box">
      <IconButton onClick={() => history.goBack()}>
        <ArrowBackIcon className="contact-return-btn" />
      </IconButton>
      {props.loading && <Loading />}
      {!props.loading && (
        <Card
          style={{
            width: "40rem",
            position: "absolute",
            padding: "20px",
            display: "block",
            marginLeft: "25vw",
            marginTop: "25px",
            height: "15rem",
          }}
        >
          <Typography component={"span"}>
            <h2>Seller Contact</h2>
            <span style={{ marginLeft: "10px", position: "absolute" }}>
              <Avatar
                className={classes.avatar}
                style={{ width: 50, height: 50 }}
                src={
                  location.state.username ===
                  JSON.parse(sessionStorage.getItem("user"))?.userName
                    ? props.myAvatar
                    : props.avatar
                }
              >
                {username[0]}
              </Avatar>
            </span>
            <span
              style={{
                marginLeft: "80px",
                marginTop: "10px",
                position: "absolute",
              }}
            >
              {username}
            </span>
            <p
              style={{
                fontSize: "15px",
                color: "grey",
                paddingRight: "10px",
                bottom: "2rem",
                position: "absolute",
              }}
            >
              Name: {props.contact?.firstName} {props.contact?.lastName}
              <br />
              Phone: {props.contact?.phone}
              <br />
              Email: {props.contact?.email}
            </p>
          </Typography>
        </Card>
      )}
    </Box>
  );
};
export default ContactInfo;
