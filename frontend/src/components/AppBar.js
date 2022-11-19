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

import DashboardIcon from "@mui/icons-material/Dashboard";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import styles from "../styles";
import states from "../states";

import SearchBar from "./SearchBar";
import Login from "./Login";
import SignUp from "./SignUp";
import Post from "./Post";
import AlertMsg from "./AlertMsg";
/**
 * AppBar
 *
 * @return {object} JSX
 */
const Appbar = (props) => {
  const classes = styles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAccountMenu = Boolean(anchorEl);
  const [login, setLogin] = useState(props.login);
  const [openSignup, setSignup] = useState(false);

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("Login successfully");
  const [success, setSucess] = useState(false);
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
    history.push("/");
    window.location.reload(false);
  };

  return (
    <AppBar className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolbar}>
        {/*title*/}
        <Typography className={classes.title} style={{ flex: 1 }}>
          Locally Imagined
        </Typography>
        <SearchBar items={props.items} setFilter={props.setFilter} />
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
              onClick={() => history.push("/dashboard")}
            >
              <DashboardIcon></DashboardIcon>
            </IconButton>
          </Tooltip>
        )}
        {/*Notifications button*/}
        {login && (
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
        )}
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
              <Avatar className={classes.avatar}></Avatar>
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
              history.push("/account");
              window.location.reload(false);
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
        <AlertMsg
          error={error}
          success={success}
          type={"error"}
          setError={setError}
          setSucess={setSucess}
          msg={msg}
        />
      )}
      {/*successful alert*/}
      {success && (
        <AlertMsg
          error={error}
          success={success}
          type={"success"}
          setError={setError}
          setSucess={setSucess}
          msg={msg}
        />
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
