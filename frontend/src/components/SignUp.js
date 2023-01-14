import React from "react";
import { Button, InputBase, Modal, Paper, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import styles from "../styles";
import states from "../states";
import axios from "axios";
import "./SignUp.css";
/**
 * SignUp
 * @return {object} JSX
 */
const SignUp = (props) => {
  const classes = styles();
  const history = useHistory();
  //send signup request to database
  const submitSignup = (event) => {
    event.preventDefault();
    props.setSignup(false);
    //for testing
    // alert(`
    // email:${props.user.email}
    // userName: ${props.user.userName}
    // password:${props.user.password}
    // phone:${props.user.phone}
    // firstname and lastname:${
    //   props.user.firstName + " " + props.user.lastName
    // }`);
    const body = JSON.stringify({
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      phone: props.user.phone,
      email: props.user.email,
    });
    axios
      .post("https://locally-imagined.herokuapp.com/signup", body, {
        "content-type": "application/json",
        auth: {
          username: props.user.userName,
          password: props.user.password,
        },
      })
      .then((res) => {
        if (res.status != 200) {
          throw res;
        } else {
          props.setError(false);
          console.log(res);
          props.user.token = res.data;
          delete props.user.password;
          sessionStorage.setItem("user", JSON.stringify(props.user));
          console.log(sessionStorage.getItem("user"));
          states.login = true;
          states.user.userName = props.user.userName;
          props.setLogin(states.login);
          const userID = JSON.parse(sessionStorage.getItem("user")).token
            .userID;

          props.setUserID(userID);
          sessionStorage.removeItem("currentUserID");
          sessionStorage.setItem("currentUserID", userID);

          props.setMsg(
            "Successfully Sign Up, You will be directed to profile setting in 3s"
          );
          props.setSucess(true);
          setTimeout(() => {
            history.push(`/settings`, {
              userID: userID,
            });
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) props.setMsg("Something went wrong");
        else props.setMsg("Username or Email is already taken");
        props.setError(true);
        console.log(err);
      });
  };

  return (
    <Modal open={props.openSignup} onClose={() => props.setSignup(false)}>
      <Paper className="signup">
        <h1 className="signup-title">Join Locally Imagined</h1>
        <Divider className={classes.divider} />
        <form onSubmit={submitSignup} className="signup-form">
          <InputBase
            className="signup-input"
            placeholder="Username"
            inputProps={{
              "data-testid": "input-username",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="text"
            name="userName"
          />
          <InputBase
            className="signup-input"
            placeholder="First Name"
            inputProps={{
              "data-testid": "input-firstname",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="text"
            name="firstName"
          />
          <InputBase
            className="signup-input"
            placeholder="Last Name"
            inputProps={{
              "data-testid": "input-lastname",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="text"
            name="lastName"
          />
          <InputBase
            className="signup-input"
            placeholder="Phone"
            inputProps={{
              "data-testid": "input-phone",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="number"
            name="phone"
          />
          <InputBase
            className="signup-input"
            placeholder="Email address"
            inputProps={{
              "data-testid": "input-email",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="email"
            name="email"
          />

          <InputBase
            className="signup-input"
            placeholder="Password"
            inputProps={{
              "data-testid": "input-password",
              onChange: props.handleInputChange,
              required: true,
            }}
            type="password"
            name="password"
          />

          <Button
            variant="text"
            type="submit"
            value="Submit"
            data-testid="submit-signup"
            className="signup-btn"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};
export default SignUp;
