import React from "react";
import {
  Typography,
  IconButton,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "react-lazy-load-image-component/src/effects/blur.css";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import styles from "../../styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AlertMsg from "../AlertMsg";
import "./AccountSetting.css";
/**
 * AccountSetting
 * @return {object} JSX
 */
const AccountSetting = (props) => {
  const location = useLocation();
  const classes = styles();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [url, setUrl] = React.useState("");
  const [setting, setSetting] = useState({
    avatar: "",
    bio: "",
  });

  useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem("avatar")));
    props.getAvatar(sessionStorage.getItem("myAvatar"), "otherAvatar");
    props.getInfo(location.state.userID);
  }, []);
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
    });
  };
  const handleSettingChange = (event) => {
    if (event.target.name === "avatar") {
      //console.log("img");
      setUrl(URL.createObjectURL(event.target.files[0]));
      //console.log(url);
      getBase64(event.target.files[0])
        .then((result) => {
          setSetting({
            ...setting,
            [event.target.name]: result.split(",").pop(),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSetting({ ...setting, bio: event.target.value });
    }
    console.log(setting);
  };
  const submitSetting = (event) => {
    event.preventDefault();

    if (!setting.avatar && setting.bio.length === 0) {
      setMsg("no changes were made");
      setInfo(true);
      return;
    }
    let token = JSON.parse(sessionStorage.getItem("user")).token.jwt;
    if (!token) token = JSON.parse(sessionStorage.getItem("user")).token;
    console.log(token);
    if (setting.avatar) {
      axios
        .put(
          "https://locally-imagined.herokuapp.com/users/updateprofilepic",
          {
            content: setting.avatar,
          },
          {
            "content-type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status != 200 || !res.data) {
            throw res;
          } else {
            console.log(`res:${JSON.stringify(res.data.imageID)}`);
            sessionStorage.setItem("myAvatar", res.data.imageID);
            setSuccess(true);
            setMsg("updated");
            // alert("success");
          }
        })
        .catch((err) => {
          setError(true);
          setMsg("something went wrong");
          console.log(err);
        });
    }
    if (setting.bio.length > 0) {
      axios
        .put(
          "https://locally-imagined.herokuapp.com/users/updatebio",
          {
            bio: setting.bio,
          },
          {
            "content-type": "application/json",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status != 200 || !res.data) {
            throw res;
          } else {
            console.log(`res:${JSON.stringify(res.data)}`);
            setSuccess(true);
            setMsg("updated");
            // alert("success");
          }
        })
        .catch((err) => {
          setError(true);
          setMsg("something went wrong");
          console.log(err);
        });
    }
  };
  return (
    <Box className="setting-box">
      {info && (
        <AlertMsg success={info} type={"info"} setInfo={setInfo} msg={msg} />
      )}
      {success && (
        <AlertMsg
          success={success}
          type={"success"}
          setSucess={setSuccess}
          msg={msg}
        />
      )}
      {error && (
        <AlertMsg
          success={error}
          type={"error"}
          setError={setError}
          msg={msg}
        />
      )}
      <form onSubmit={submitSetting} className="setting-form">
        <Card className="setting-card">
          {user && (
            <div>
              <h2 className="setting-title">Avatar</h2>
              <span className="setting-avatar">
                <Avatar
                  className={classes.avatar}
                  style={{ width: 100, height: 100 }}
                  src={url ? url : props.myAvatar}
                >
                  {user.userName[0]}
                </Avatar>
              </span>
              <span className="setting-upload">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  multiple
                  id="icon-button-file"
                  type="file"
                  name="avatar"
                  onChange={handleSettingChange}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                  upload
                </label>
              </span>

              <div className="setting-text">
                Upload an avatar to add a little more personality to your
                profile!
              </div>
            </div>
          )}
        </Card>
        <Card className="setting-card">
          {user && (
            <dic>
              <h2 className="setting-title">Bio</h2>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "grey",
                  borderRadius: "4px",
                }}
              >
                <TextField
                  multiline
                  minRows={4}
                  disabled={setting.bio.length >= 300}
                  defaultValue={props.contact.bio}
                  variant="standard"
                  name="bio"
                  onChange={handleSettingChange}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  style={{ width: "40rem", padding: "10px" }}
                />
              </div>

              <div className="setting-text">
                Tell your customers a little about yourself in 300 characters or
                less.
              </div>
            </dic>
          )}
        </Card>
        <Button
          type="submit"
          value="Submit"
          style={{
            position: "absolute",
            color: "white",
            right: "10rem",
            marginTop: "40rem",
            marginBottom: "2rem",
            marginRight: "1rem",
            backgroundColor: "#293f94",
          }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};
export default AccountSetting;
