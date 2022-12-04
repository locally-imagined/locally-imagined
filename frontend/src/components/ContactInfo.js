import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactLoading from "react-loading";
import styles from "../styles";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ContactInfo = (props) => {
  const classes = styles();
  const paraUserID = useParams();
  const username = sessionStorage.getItem("currentUsername");
  useEffect(() => {
    props.getContactInfo(paraUserID.userID.slice(1));
  }, []);
  return (
    <Box className={classes.accountBox}>
      <br />
      <br />
      <br />
      {props.loading && (
        <Box
          className={classes.loading}
          style={{ marginLeft: "45vw", height: "100vh", marginTop: "10vh" }}
        >
          <ReactLoading type="bars" color="grey" height={100} width={100} />
        </Box>
      )}
      {!props.loading && (
        <Card
          className={classes.settingCard}
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
