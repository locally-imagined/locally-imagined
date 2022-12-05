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
import { useHistory } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles";
import states from "../../states";

/**
 * AppBar
 *
 * @return {object} JSX
 */
const NavBar = (props) => {
  const classes = styles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAccountMenu = Boolean(anchorEl);
  const [login, setLogin] = useState(props.login);

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
  const accountHandler = () => {
    setAnchorEl(null);
    props.setSearch("");
    const userID = JSON.parse(sessionStorage.getItem("user")).token.userID;
    const username = JSON.parse(sessionStorage.getItem("user")).userName;
    console.log(username);
    props.setUserID(userID);
    sessionStorage.removeItem("currentUserID");
    sessionStorage.setItem("currentUserID", userID);
    history.push(`/profile/${username}`, {
      userID: userID,
      username: username,
    });
  };
  const accountSettingHandler = () => {
    setAnchorEl(null);
    props.setSearch("");
    const userID = JSON.parse(sessionStorage.getItem("user")).token.userID;

    //console.log(username);
    props.setUserID(userID);
    sessionStorage.removeItem("currentUserID");
    sessionStorage.setItem("currentUserID", userID);
    history.push(`/settings`);
    window.location.reload(false);
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
        <Typography style={{ flex: 1 }}>
          <img
            src="/logo.png"
            alt="Locally Imagine"
            data-testid="nav-logo"
            onClick={() => {
              history.push(`/`);
              window.location.reload(false);
            }}
            className={classes.logo}
          ></img>
        </Typography>

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
            onClick={accountHandler}
            className={classes.accountMenuItem}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={accountSettingHandler}
            className={classes.accountMenuItem}
          >
            Account Settings
          </MenuItem>
          <MenuItem onClick={handleLogout} className={classes.accountMenuItem}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
