import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Avatar,
  Collapse,
  IconButton,
  Modal,
  Paper,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Alert } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import styles from "../styles";
import states from "../states";
import axios from "axios";
import SearchBar from "./SearchBar";
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
  const [openPost, setPost] = useState(false);
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
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  //user object
  const [user, setUser] = React.useState({
    userName: "",
    password: "",
    email: "",
  });
  //Post object
  const [art, setArt] = useState({ postTitle: "", imgFile: "", postDesc: "" });
  const handlePostChange = (event) => {
    if (event.target.name === "imgFile") {
      setArt({
        ...art,
        [event.target.name]: new FormData(event.target),
      });
    } else {
      setArt({
        ...art,
        [event.target.name]: event.target.value,
      });
    }

    console.log(art);
  };

  //send login request to database
  const submitLogin = (event) => {
    event.preventDefault();
    console.log(user);

    const authorizationBasic = window.btoa(user.userName + ":" + user.password);

    // fetch(
    //   `https://locally-imagined.herokuapp.com/login/${user.username}/${user.password}`,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    // axios
    //   .get(`https://locally-imagined.herokuapp.com/login`, {
    //     // "Access-Control-Allow-Origin": "*",
    //     // "Access-Control-Allow-Credentials": true,
    //     headers: {
    //       "Content-Type": "application/json",
    //       // "Content-Type": "text/plain;charset=utf-8",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Credentials": false,
    //       // Authorization: "Basic " + authorizationBasic,
    //     },
    //     // auth: {
    //     //   username: user.username,
    //     //   password: user.password,
    //     // },
    //   })
    axios
      .post(
        "https://locally-imagined.herokuapp.com/login",
        {},
        {
          auth: {
            username: user.userName,
            password: user.password,
          },
        }
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          setError(false);
          console.log(res);
          user.token = res.data;
          //sessionStorage.setItem("token", res.data);
          sessionStorage.setItem("user", JSON.stringify(user));
          console.log(sessionStorage.getItem("user"));
          states.login = true;
          states.user.userName = user.userName;
          setLogin(states.login);
          setMsg("Log in Successfully");
          setSucess(true);
          //alert(`userName: ${states.user.userName}`);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        //fake login
        // setLogin(true);
        // states.login = true;
        setMsg("Incorrect username or password");
        setError(true);
      });
  };

  //send signup request to database
  const submitSignup = (event) => {
    event.preventDefault();
    setSignup(false);
    //for testing
    alert(`
    email:${user.email}
    userName: ${user.userName}
    password:${user.password}`);
    axios
      .post(
        "https://locally-imagined.herokuapp.com/signup",
        {},
        {
          auth: {
            username: user.userName,
            password: user.password,
          },
        }
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          setError(false);
          console.log(res);
          user.token = res.data;
          //sessionStorage.setItem("token", res.data);
          sessionStorage.setItem("user", JSON.stringify(user));
          console.log(sessionStorage.getItem("user"));
          states.login = true;
          states.user.userName = user.userName;
          setLogin(states.login);
          setMsg("Sign Up Successfully");
          setSucess(true);
          //alert(`userName: ${states.user.userName}`);
          history.push("/");
        }
      })
      .catch((err) => {
        // do nothing.
        setMsg("Username is already taken");
        setError(true);
        console.log(err);
      });
  };
  const submitPost = (event) => {
    event.preventDefault();
    alert(`
    postTitle:${art.postTitle}
    postDesc: ${art.postDesc}
    imgFile:${art.imgFile}`);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setLogin(false);
    states.login = false;
    setAnchorEl(null);
    history.push("/");
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
          <form onSubmit={submitLogin}>
            {/*username input*/}
            <InputBase
              raised
              className={classes.fastlogin}
              placeholder="Username"
              inputProps={{ onChange: handleInputChange, required: true }}
              type="text"
              name="userName"
            />
            {/*password input*/}
            <InputBase
              raised
              className={classes.fastlogin}
              placeholder="Password"
              inputProps={{ onChange: handleInputChange, required: true }}
              type="password"
              name="password"
            />
            {/*login and submit*/}
            <Button
              variant="text"
              raised
              type="submit"
              value="Submit"
              className={classes.login}
            >
              Login
            </Button>

            <Button
              underline="hover"
              className={classes.register}
              onClick={() => setSignup(true)}
              raised
            >
              Sign Up
            </Button>
          </form>
        )}
        {/*post button*/}
        {login && (
          <Tooltip title="post">
            <IconButton
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "post" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => setPost(true)}
            >
              <AddIcon></AddIcon>
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
      <Collapse in={error}>
        <Alert
          severity="error"
          className={classes.errorMsg}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}, <strong>try again</strong>
        </Alert>
      </Collapse>
      {/*successful alert*/}
      <Collapse in={success}>
        <Alert
          severity="success"
          className={classes.errorMsg}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSucess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>

      {/*Post modal*/}
      <Modal open={openPost} onClose={() => setPost(false)}>
        <Paper className={classes.signUp}>
          <h1 className={classes.signUpTitle}>Post Your Art</h1>
          <Divider className={classes.divider} />
          <form onSubmit={submitPost}>
            <InputBase
              className={classes.signUpInput}
              placeholder="Title"
              inputProps={{
                "data-testid": "title",
                onChange: handlePostChange,
                required: true,
              }}
              type="text"
              name="postTitle"
            />
            <InputBase
              className={classes.signUpInput}
              placeholder="Description"
              inputProps={{
                "data-testid": "description",
                onChange: handlePostChange,
                required: true,
              }}
              type="text"
              name="postDesc"
            />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              onChange={handlePostChange}
              required
              type="file"
              name="imgFile"
            />
            <Divider className={classes.divider} />
            <Button
              variant="text"
              raised
              type="submit"
              value="Submit"
              className={classes.signUpButton}
            >
              Post
            </Button>
          </form>
        </Paper>
      </Modal>

      {/*Signup modal*/}
      <Modal open={openSignup} onClose={() => setSignup(false)}>
        <Paper className={classes.signUp}>
          <h1 className={classes.signUpTitle}>Join Locally Imagined</h1>
          <Divider className={classes.divider} />
          <form onSubmit={submitSignup}>
            <InputBase
              className={classes.signUpInput}
              placeholder="Username"
              inputProps={{
                onChange: handleInputChange,
                required: true,
              }}
              type="text"
              name="userName"
            />
            <InputBase
              className={classes.signUpInput}
              placeholder="Email address"
              inputProps={{
                "data-testid": "email",
                onChange: handleInputChange,
                required: true,
              }}
              type="email"
              name="email"
            />

            <InputBase
              className={classes.signUpInput}
              placeholder="Password"
              inputProps={{
                "data-testid": "password",
                onChange: handleInputChange,
                required: true,
              }}
              type="password"
              name="password"
            />

            <Divider className={classes.divider} />
            <Button
              variant="text"
              raised
              type="submit"
              value="Submit"
              className={classes.signUpButton}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Modal>
    </AppBar>
  );
};

export default Appbar;
