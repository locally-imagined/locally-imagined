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
}));

export default styles;
