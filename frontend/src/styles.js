import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.contrastText,
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
  },
  container: {
    width: "100vh",
    height: 350,
    backgroundColor: theme.palette.primary.light,
    position: "fixed",
    bottom: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "spacebetween",
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: "27px",
    fontWeight: "bold",
    marginLeft: -20,
  },
  login: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    justify: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  register: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.contrastText,
    justify: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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

  topbar: {
    position: "relatively",
    marginTop: 20,
    marginLeft: -10,
    backgroundColor: "white",
    width: "37vh",
  },
  icon: {
    backgroundColor: "#eeeeee",
    color: "#424242",
    padding: "5px",
    borderRadius: "50%",
  },
  forgotTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  account: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  username: {
    fontWeight: "bold",
    top: 70,
    margin: "20px",
  },
  profilePic: {
    display: "inline-block",
    top: 20,
  },
  signUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "70%",
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
  signUpCreate: {
    display: "flex",
    color: "white",
    backgroundColor: "#03a402",
    fontWeight: "bold",
    width: "70%",
    marginTop: theme.spacing(3),
  },
  signUpInput: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#eeeeee",
    elevation: 1,
    width: "100%",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),

    padding: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
  },
  signUpTitle: {
    color: theme.palette.primary.main,
    fontSize: "27px",
    fontWeight: "bold",
  },
}));

export default styles;
