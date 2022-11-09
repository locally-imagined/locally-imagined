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

    //const authorizationBasic = window.btoa(user.userName + ":" + user.password);

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
        style={{ color: "white" }}
      >
        Login
      </Button>

      <Button
        underline="hover"
        className={classes.register}
        onClick={() => props.setSignup(true)}
        raised
      >
        Sign Up
      </Button>
    </form>
  );
};
export default Login;
