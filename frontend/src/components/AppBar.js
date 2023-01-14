import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";

import AddIcon from "@mui/icons-material/Add";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles";
import states from "../states";
import SearchBar from "./SearchBar";
import Login from "./Login";
import SignUp from "./SignUp";
import LoginModal from "./LoginModal";
import Post from "./Dashboard/Post";
import AlertMsg from "./AlertMsg";
import ChangePage from "./ChangePage";
import "./AppBar.css";
/**
 * Appbar
 * @return {object} JSX
 */
const Appbar = (props) => {
  const classes = styles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [login, setLogin] = useState(props.login);
  const [openSignup, setSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [sessionEnd, setSessionEnd] = useState(false);
  const [info, setInfo] = useState(false);
  const openAccountMenu = Boolean(anchorEl);
  class sessionTimer {
    constructor(time) {
      this.timeLeft = Number(time) * 60 * 60 * 1000;
      this.timeLeftSec = Number(time) * 60 * 60;
      console.log(`session time:${Math.trunc(time)}hour`);
      this.setTimer();
      this.setCountDown();
    }
    timeoutHandler() {
      props.setUser({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
      sessionStorage.clear();

      states.login = false;
      history.push("/");
      window.location.reload(false);
    }
    countDownHandler() {
      this.timeLeftSec--;
      if (Math.trunc(this.timeLeftSec) === 30) {
        setSessionEnd(true);
        setMsg(
          `your session is about to end in ${Math.trunc(
            this.timeLeftSec
          )} seconds`
        );
        setInfo(true);
      }
    }
    setTimer() {
      setTimeout(this.timeoutHandler, this.timeLeft);
    }
    setCountDown() {
      setInterval(this.countDownHandler.bind(this), 1000);
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };
  //handle user input field change
  const handleInputChange = (event) => {
    props.setUser({
      ...props.user,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setLogin(false);
    states.login = false;
    setAnchorEl(null);
    history.push(`/`);
    window.location.reload(false);
  };
  const accountHandler = () => {
    setAnchorEl(null);
    props.setSearch("");
    const userID = JSON.parse(sessionStorage.getItem("user")).token.userID;
    const username = JSON.parse(sessionStorage.getItem("user")).userName;
    //console.log(username);
    props.setUserID(userID);
    props.getAvatar(
      JSON.parse(sessionStorage.getItem("user"))?.token.profpicID,
      "myAvatar"
    );
    props.getInfo(userID);
    sessionStorage.removeItem("currentUserID");
    sessionStorage.setItem("currentUserID", userID);
    history.push(`/profile/${username}`, {
      userID: userID,
      username: username,
    });
    window.location.reload(false);
  };
  const accountSettingHandler = () => {
    setAnchorEl(null);
    props.setSearch("");
    const userID = JSON.parse(sessionStorage.getItem("user")).token.userID;

    //console.log(username);
    props.setUserID(userID);
    props.getInfo(userID);
    sessionStorage.removeItem("currentUserID");
    sessionStorage.setItem("currentUserID", userID);
    history.push(`/settings`, {
      userID: userID,
    });
    window.location.reload(false);
  };
  useEffect(() => {
    props.setCurPath(location.pathname);
    props.getAvatar(sessionStorage.getItem("myAvatar"), "myAvatar");

    props.getAvatar(
      JSON.parse(sessionStorage.getItem("avatar")),
      JSON.parse(sessionStorage.getItem("user"))?.username,
      "otherAvatar"
    );
  }, []);

  return (
    <header className="appbar">
      {/*title*/}
      <div className="logo">
        <img
          src="/logo.png"
          alt="Locally Imagine"
          data-testid="app-logo"
          onClick={() => {
            history.push(`/`);
            window.location.reload(false);
          }}
          className="logo-image"
        ></img>
      </div>
      <div className="appbar-feature">
        <SearchBar
          tab={props.tab}
          items={props.items}
          getSrc={props.getSrc}
          setFilter={props.setFilter}
          offset={props.offset}
          setSearch={props.setSearch}
          search={props.search}
          setOffset={props.setOffset}
          noResult={props.noResult}
          setLoading={props.setLoading}
          setCurPath={props.setCurPath}
          setNoResult={props.setNoResult}
          setTab={props.setTab}
          getPosts={props.getPosts}
          filterQuery={props.filterQuery}
        />

        {/*display fast login input fields while not login <form>*/}
        <div className="login-input">
          {!login && (
            <Login
              setError={props.setError}
              setLogin={setLogin}
              setMsg={props.setMsg}
              setSuccess={props.setSuccess}
              setUser={props.setUser}
              user={props.user}
              setSignup={setSignup}
              setMyAvatar={props.setMyAvatar}
              getAvatar={props.getAvatar}
              sessionTimer={sessionTimer}
              getMyAvatar={props.getMyAvatar}
            />
          )}
        </div>
        {!login && (
          <button className="login-btn" onClick={() => setOpenLogin(true)}>
            Log In
          </button>
        )}
        {!login && (
          <Button
            underline="hover"
            className="signup-btn"
            onClick={() => setSignup(true)}
          >
            Sign Up
          </Button>
        )}
        {/*Create post button*/}
        {login && (
          <Tooltip title="Create Posts">
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-haspopup="true"
              data-testid="button-dashboard"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                props.setSearch("");
                history.push("/create");
              }}
            >
              <AddIcon></AddIcon>
            </IconButton>
          </Tooltip>
        )}

        {/*display avatar and username and log out button when login*/}
        {login && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              data-testid="account-setting"
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar className={classes.avatar} src={props.myAvatar}>
                {props.user.userName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        {/*Account menu*/}
        <Menu
          anchorEl={anchorEl}
          className="account-menu"
          open={openAccountMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={accountHandler}
            data-testid="button-profile"
            className="account-menu-item"
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={accountSettingHandler}
            data-testid="button-setting"
            className="account-menu-item"
          >
            Account Settings
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            className="account-menu-item"
            data-testid="button-logout"
          >
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/*Signup modal*/}
      <SignUp
        setSignup={setSignup}
        handleInputChange={handleInputChange}
        openSignup={openSignup}
        setError={props.setError}
        setLogin={setLogin}
        setMsg={props.setMsg}
        setSucess={props.setSucess}
        setUser={props.setUser}
        user={props.user}
        setUserID={props.setUserID}
      />

      {/*Login modal*/}
      <LoginModal
        setError={props.setError}
        setLogin={setLogin}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setMsg={props.setMsg}
        setSuccess={props.setSuccess}
        setUser={props.setUser}
        user={props.user}
        setSignup={setSignup}
        setMyAvatar={props.setMyAvatar}
        getAvatar={props.getAvatar}
        sessionTimer={sessionTimer}
        getMyAvatar={props.getMyAvatar}
      />
    </header>
  );
};

export default Appbar;
