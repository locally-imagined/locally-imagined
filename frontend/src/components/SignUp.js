import React from "react";
import { Button, InputBase, Modal, Paper, Divider } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import styles from "../styles";
import states from "../states";
import axios from "axios";

const SignUp = (props) => {
  const classes = styles();
  const history = useHistory();
  //send signup request to database
  const submitSignup = (event) => {
    event.preventDefault();
    props.setSignup(false);
    //for testing
    // alert(`
    // email:${user.email}
    // userName: ${user.userName}
    // password:${user.password}`);
    axios
      .post(
        "https://locally-imagined.herokuapp.com/signup",
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
          props.setMsg("Sign Up Successfully");
          props.setSucess(true);
          //alert(`userName: ${states.user.userName}`);
          history.push("/");
        }
      })
      .catch((err) => {
        // do nothing.
        props.setMsg("Username is already taken");
        props.setError(true);
        console.log(err);
      });
  };
  return (
    <Modal open={props.openSignup} onClose={() => props.setSignup(false)}>
      <Paper className={classes.signUp}>
        <h1 className={classes.signUpTitle}>Join Locally Imagined</h1>
        <Divider className={classes.divider} />
        <form onSubmit={submitSignup}>
          <InputBase
            className={classes.signUpInput}
            placeholder="Username"
            inputProps={{
              onChange: props.handleInputChange,
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
              onChange: props.handleInputChange,
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
              onChange: props.handleInputChange,
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
  );
};
export default SignUp;
