import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Avatar,
  Link,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import styles from "../styles";

const Items = (props) => {
  const classes = styles();
  const history = useHistory()
  const scrollOption = {
    top: 60,
    left: 100,
    behavior: "smooth",
  };

  const artistPost = (userID, username, profpicID) => {
    props.setImages([]);
    props.setArtistItem([]);
    sessionStorage.setItem("currentUserID", userID);
    props.setUserID(userID);
    props.getInfo(userID);
    props.getAvatar(profpicID, "otherAvatar");
    history.push(`/profile/${username}`, {
      userID: userID,
      username: username,
    });
    window.scrollTo(scrollOption);
  };

  if (props.tab === "explore") {
    return props.items.map((item, index) => (
      <Card className={classes.item} key={index}>
        {props.icon === "edit" && props.user.userName === item?.username && (
          <IconButton
            className={classes.favoriteIcon}
            onClick={() => {
              props.openEditHandler(index);
              props.setOpenEdit(true);
            }}
            size="medium"
            id={index}
            data-testid={`edit-image-${index}`}
          >
            <EditIcon />
          </IconButton>
        )}
        <CardActionArea
          onClick={() => props.openItemHandler(index, item.username)}
        >
          <LazyLoadImage
            className={classes.image}
            src={item.url}
            alt="Image Alt"
            effect="blur"
          />
          <CardContent>
            <Typography
              className={classes.itemTitle}
              varient="body"
              data-testid={`image-title`}
            >
              {item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
    }
    if (props.tab === "artists") {
      return props.items.map((item, index) => (
        <Card className={classes.item} key={index}>
          <CardActionArea
            onClick={() =>
              artistPost(
                item.userID,
                item.username,
                item.profpicID
              )
            }
          >
            <Avatar src={item.url}></Avatar>
            <CardContent>
              <Typography
                className={classes.itemTitle}
                varient="body"
                data-testid={`image-title`}
              >
                {item.username}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ));
      } 
    return props.items.map((item, index) => (
      <Card className={classes.item} key={index}>
        {props.icon === "edit" && props.user.userName === item?.username && (
          <IconButton
            className={classes.favoriteIcon}
            onClick={() => {
              props.openEditHandler(index);
              props.setOpenEdit(true);
            }}
            size="medium"
            id={index}
            data-testid={`edit-image-${index}`}
          >
            <EditIcon />
          </IconButton>
        )}
        <CardActionArea
          onClick={() => props.openItemHandler(index, item.username)}
        >
          <LazyLoadImage
            className={classes.image}
            src={item.url}
            alt="Image Alt"
            effect="blur"
          />
          <CardContent>
            <Typography
              className={classes.itemTitle}
              varient="body"
              data-testid={`image-title`}
            >
              {item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  };

export default Items;
