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
    </AppBar>
  );
};

export default NavBar;
