import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles";
import states from "../states";
import SearchBar from "./SearchBar";
import Login from "./Login";
import SignUp from "./SignUp";
import Post from "./Post";
import AlertMsg from "./AlertMsg";
import ChangePage from "./ChangePage";

/**
 * AppBar
 *
 * @return {object} JSX
 */
const Appbar = (props) => {
  const classes = styles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [login, setLogin] = useState(props.login);
  const [openSignup, setSignup] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("Login successfully");
  const [success, setSucess] = useState(false);
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
  useEffect(() => {
    props.setCurPath(location.pathname);
  }, []);

  return (
    <AppBar className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolbar}>
        {/*title*/}
        <Typography style={{ flex: 1 }}>
          <span
            onClick={() => {
              history.push(`/`);
              window.location.reload(false);
            }}
            className={classes.title}
          >
            Locally Imagined
          </span>
        </Typography>
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
        />
        {/*display fast login input fields while not login*/}
        {!login && (
          <Login
            setError={setError}
            setLogin={setLogin}
            setMsg={setMsg}
            setSucess={setSucess}
            setUser={props.setUser}
            user={props.user}
            setSignup={setSignup}
            sessionTimer={sessionTimer}
          />
        )}
        {/*Dashboard button*/}
        {login && (
          <Tooltip title="Dashboard">
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => {
                props.setSearch("");
                history.push("/dashboard");
              }}
            >
              <AddIcon></AddIcon>
            </IconButton>
          </Tooltip>
        )}
        {/*Notifications button*/}
        {/* {login && (
          <Tooltip title="Notifications">
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "notifications" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <NotificationsIcon></NotificationsIcon>
            </IconButton>
          </Tooltip>
        )} */}
        {/*display avatar and username and log out button when login*/}
        {login && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar className={classes.avatar}>
                {props.user.userName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        {/*Account menu*/}
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          className={classes.accountMenu}
          open={openAccountMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              props.setSearch("");
              props.getArtistPosts();
              history.push("/account");

              //window.location.reload(false);
            }}
            className={classes.accountMenuItem}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} className={classes.accountMenuItem}>
            Account Setting
          </MenuItem>
          <MenuItem onClick={handleLogout} className={classes.accountMenuItem}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      {/*unsuccessful alert*/}
      {error && (
        <AlertMsg error={error} type={"error"} setError={setError} msg={msg} />
      )}
      {/*successful alert*/}
      {success && (
        <AlertMsg
          success={success}
          type={"success"}
          setSucess={setSucess}
          msg={msg}
        />
      )}
      {/*Timeout alert*/}
      {sessionEnd && (
        <AlertMsg type={"info"} setInfo={setInfo} info={info} msg={msg} />
      )}

      {/*Signup modal*/}
      <SignUp
        setSignup={setSignup}
        handleInputChange={handleInputChange}
        openSignup={openSignup}
        setError={setError}
        setLogin={setLogin}
        setMsg={setMsg}
        setSucess={setSucess}
        setUser={props.setUser}
        user={props.user}
      />
    </AppBar>
  );
};

export default Appbar;
