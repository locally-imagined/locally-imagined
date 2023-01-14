import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  login: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    justify: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  logout: {
    padding: theme.spacing(3),
  },

  fastlogin: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#eeeeee",
    padding: theme.spacing(1),
    height: "37px",
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  signUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    padding: theme.spacing(3),
  },

  signUpButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    justify: "space-between",
    marginTop: theme.spacing(2),
    width: "100%",
  },

  signUpInput: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#eeeeee",
    elevation: 1,
    width: "90%",
    height: "40px",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15px",
    marginTop: theme.spacing(3),

    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
  },
}));

export default styles;
