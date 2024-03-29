import React from "react";
import { Button, InputBase } from "@material-ui/core";
import styles from "../styles";
import states from "../states";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
/**
 * Login
 * @return {object} JSX
 */
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
    // console.log(props.user);
    axios
      .post(
        "https://locally-imagined-e6de634a2095.herokuapp.com/login",
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
          // console.log(res);
          props.user.token = res.data;
          delete props.user.password;
          sessionStorage.setItem("user", JSON.stringify(props.user));
          // console.log(sessionStorage.getItem("user"));
          states.login = true;
          states.user.userName = props.user.userName;
          props.setLogin(states.login);
          props.setMsg("Successfully Logged In");
          props.getAvatar(
            JSON.parse(sessionStorage.getItem("user"))?.token.profpicID,
            "myAvatar"
          );
          props.setSuccess(true);
          const timer = new props.sessionTimer(2); //2 hours session timer

          history.push("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401)
          props.setMsg(`Incorrect Username or Password `);
        else props.setMsg(`error:${err}`);
        // console.error(err);
        props.setError(true);
      });
  };
  return (
    <form onSubmit={submitLogin}>
      {/*username input*/}
      <InputBase
        className={classes.fastlogin}
        placeholder="Username"
        inputProps={{
          onChange: handleInputChange,
          "data-tesid": "username",
          required: true,
        }}
        type="text"
        name="userName"
      />
      {/*password input*/}
      <InputBase
        className={classes.fastlogin}
        placeholder="Password"
        inputProps={{
          onChange: handleInputChange,
          "data-tesid": "password",
          required: true,
        }}
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
    </form>
  );
};
export default Login;
