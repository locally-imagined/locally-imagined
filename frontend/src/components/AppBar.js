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
} from "@material-ui/core";
import { Alert, AlertTitle } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import styles from "../styles";
import states from "../states";

/**
 * AppBar
 *
 * @return {object} JSX
 */
const Appbar = () => {
  const classes = styles();
  const history = useHistory();
  const [login, setLogin] = useState(states.login);
  const [error, setError] = useState(false);
  //handle username and password input field change
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const u = user;
    u[name] = value;
    setUser(u);
  };
  //user object
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
    telephone: "",
    firstname: "",
    lastname: "",
    avatar: "",
  });

  const SubmitLogin = (event) => {
    event.preventDefault();
    console.log(user);
    const userlogin = { username: user.username, password: user.password };
    fetch("http://localhost:3010/v0/login", {
      method: "POST",
      body: JSON.stringify(userlogin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        states.login = true;
        return res.json();
      })
      .then((json) => {
        localStorage.setItem("user", JSON.stringify(json));
        states.user = JSON.parse(localStorage.getItem("user"));
        states.login = true;
        setLogin(states.login);
        alert(states.user.firstname + " " + states.user.lastname);

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <AppBar className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolbar}>
        {/*title*/}
        <Typography className={classes.title} style={{ flex: 1 }}>
          Locally Imagined
        </Typography>
        {!login && (
          <form onSubmit={SubmitLogin}>
            {/*username input*/}
            <InputBase
              raised
              className={classes.fastlogin}
              placeholder="Username"
              inputProps={{ "aria-label": "username" }}
              onChange={handleInputChange}
              type="username"
              name="username"
              required
            />
            {/*password input*/}
            <InputBase
              raised
              className={classes.fastlogin}
              placeholder="Password"
              inputProps={{ "aria-label": "password" }}
              onChange={handleInputChange}
              type="password"
              name="password"
              required
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

            <Button underline="hover" className={classes.register} raised>
              Sign Up
            </Button>
          </form>
        )}
        {/*display avatar and log out button when login*/}
        {login &&
          (<Avatar alt="user" src={user.avatar} />)(
            <Button
              variant="text"
              raised
              className={classes.logout}
              onClick={() => {
                setLogin(false);
                states.login = false;
                history.push("/");
              }}
            >
              Log out
            </Button>
          )}
      </Toolbar>
      {/*unsuccessful login alert*/}
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
          Incorrect username or password, <strong>try again</strong>
        </Alert>
      </Collapse>
    </AppBar>
  );
};

export default Appbar;
