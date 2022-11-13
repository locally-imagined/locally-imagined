import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  account: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  accountMenu: {
    marginTop: "50px",
  },

  accountMenuItem: {
    width: "300px",
  },
  appBar: {
    backgroundColor: theme.palette.primary.contrastText,
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
  },
  artistAvatar: {
    marginLeft: "80px",
    marginTop: "-40px",
    height: "50px",
    width: "50px",
    border: "2px solid white",
  },
  artistFollowButton: {
    marginLeft: "70px",
    border: "2px solid",
    borderColor: theme.palette.primary.light,
    borderRadius: "10px",
  },
  artistUserName: {
    marginLeft: "70px",
    marginTop: "10px",
  },
  anouncText: {
    color: theme.palette.primary.contrastText,
    marginTop: "40px",
    marginLeft: "15px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "20px",
  },
  announcement: {
    backgroundColor: theme.palette.primary.light,
    height: "200px",
    marginTop: "0vh",
    width: "90vw",
  },
  catBar: {
    position: "absolute",
    left: 0,
  },

  button: {
    backgroundColor: "#eeeeee",
    margin: theme.spacing(1),
    borderRadius: "16px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  category: {
    width: "40vh",
    fontSize: "15px",
  },
  categoryBox: {
    width: "100",
    backgroundColor: theme.palette.primary.light,
    fontSize: "15px",
    marginTop: "70px",
  },
  categoryBar: {
    backgroundColor: "white",
    paddingLeft: "9.6vw",
    borderBottom: " 1px solid black",
  },
  categoryBarItem: {
    paddingRight: "50px",
    position: "relative",
    width: "200px",
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
  divider: {
    marginTop: theme.spacing(3),
  },
  image: {
    height: "14vw",
    width: "15vw",
    borderRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      height: "25vw",
      width: "25vw",
    },
  },
  item: {
    height: "25vw",
    width: "15vw",
    display: "inline-block",
    marginRight: "10px",
    backgroundColor: "transparent",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      height: "40vw",
      width: "25vw",
    },
  },
  itemPrice: {
    fontWeight: "bold",
  },
  itemAddress: {
    fontSize: "13px",
    color: "#9e9e9e",
  },
  itemBox: {
    width: "100vw",
    marginLeft: "-20px",
    [theme.breakpoints.down("sm")]: {
      width: "110vw",
      marginTop: "100px",
      position: "absolute",
      left: 20,
    },
  },
  itemModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "80vw",
    height: "80vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  itemModalPicture: {
    width: "60%",
    height: "100%",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
  itemModalInfoBox: {
    width: "40%",
    height: "100%",
    display: "inline-block",
    backgroundColor: "background.paper",
    boxShadow: 24,
  },
  itemModalInfoTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  itemModalInfoBar: {
    bottom: "70vh",
    width: "28.5vw",
    borderBottom: " 1px solid grey",
  },
  itemModalInfo: {},
  itemModalInfoArtist: {
    color: "grey",
  },
  itemModalFavIcon: {
    marginLeft: "10vw",
  },

  icon: {
    backgroundColor: "#eeeeee",
    color: "#424242",
    padding: "5px",
    borderRadius: "50%",
  },
  listingTab: {
    fontSize: "15px",
    marginLeft: "120px",
  },
  listingNavItem: {
    paddingTop: "50px",
    paddingRight: "30px",
    marginLeft: "10px",
  },
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
  locationBox: {
    right: 0,
    position: "absolute",
    marginTop: "-7px",
    marginRight: "15vw",
  },
  locationButton: {
    backgroundColor: "#e3f2fd",
    position: "absolute",
    marginLeft: "-10.5vh",
    color: "#2196f3",
    width: "200px",
  },
  leftbar: {
    marginLeft: -20,
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    color: "black",
    height: "155vh",
    width: "20vw",
    border: "1px solid #999",
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    color: "#2979ff",
    "&:hover": {
      color: "#2979ff",
      textDecorationLine: "underline",
    },
  },
  listingPage: {
    zIndex: 0,
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

  forgotTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  favoriteIcon: {
    marginLeft: "11vw",
    marginBottom: "-8vh",
    zIndex: 1,
  },
  favorited: {
    color: "Crimson",
  },

  profilePic: {
    display: "inline-block",
    top: 20,
  },

  username: {
    fontWeight: "bold",
    top: 70,
    margin: "20px",
  },
  register: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.contrastText,
    justify: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  searchIcon: {
    left: 0,
    color: "#bdbdbd",
  },
  searchInput: {
    marginLeft: "10px",

    left: 0,
    width: 200,
    marginBottom: "100px",
  },
  searchResult: {
    marginTop: "60px",
    left: 0,

    width: "100vw",
    overflow: "hidden",
    overflowY: "scroll",
    height: "150px",
    zIndex: 1,
  },
  searchItems: {
    fontSize: "13px",
    display: "flex",
    marginTop: "10px",
    height: "33px",
    alignItems: "center",
    color: "black",
  },
  signUpTitle: {
    color: theme.palette.primary.main,
    fontSize: "27px",
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    marginTop: 10,
  },
  search: {
    paddingBottom: 30,
    marginTop: -19,
    height: "6px",
    border: "1px solid #999",
    borderRadius: "7px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
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

  topbar: {
    position: "relatively",
    marginTop: 20,
    marginLeft: -10,
    backgroundColor: "white",
    width: "37vh",
  },

  username: {
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
}));

export default styles;
