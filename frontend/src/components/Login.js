import React from "react";
import { Button, InputBase } from "@material-ui/core";

import styles from "../styles";
import states from "../states";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const classes = styles();
  const history = useHistory();
  const handleInputChange = (event) => {
    props.setUser({
      ...props.user,
      [event.target.name]: event.target.value,
    });
  };
  //send login request to database
  const submitLogin = (event) => {
    event.preventDefault();
    console.log(props.user);
    axios
      .post(
        "https://locally-imagined.herokuapp.com/login",
        {},
        {
          auth: {
            username: props.user.userName,
            password: props.user.password,
          },
        }
      )
      .then((res) => {
        if (res.status != 200 || !res.data) {
          throw res;
        } else {
          props.setError(false);
          console.log(res);
          props.user.token = res.data;
          //sessionStorage.setItem("token", res.data);
          sessionStorage.setItem("user", JSON.stringify(props.user));
          console.log(sessionStorage.getItem("user"));
          states.login = true;
          states.user.userName = props.user.userName;
          props.setLogin(states.login);
          props.setMsg("Log in Successfully");
          props.setSucess(true);
          const timer = new props.sessionTimer(2); //2 hours session timer
          //alert(`userName: ${states.user.userName}`);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        //fake login
        // setLogin(true);
        // states.login = true;
        props.setMsg("Incorrect username or password");
        props.setError(true);
      });
  };
  return (
    <form onSubmit={submitLogin}>
      {/*username input*/}
      <InputBase
        className={classes.fastlogin}
        placeholder="Username"
        inputProps={{ onChange: handleInputChange, required: true }}
        type="text"
        name="userName"
      />
      {/*password input*/}
      <InputBase
        className={classes.fastlogin}
        placeholder="Password"
        inputProps={{ onChange: handleInputChange, required: true }}
        type="password"
        name="password"
      />
      {/*login and submit*/}
      <Button
        variant="text"
        type="submit"
        value="Submit"
        className={classes.login}
        style={{ color: "white" }}
      >
        Login
      </Button>

      <Button
        underline="hover"
        className={classes.register}
        onClick={() => props.setSignup(true)}
      >
        Sign Up
      </Button>
    </form>
  );
};
export default Login;
