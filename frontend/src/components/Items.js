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
import "./Items.css";
const Items = (props) => {
  const classes = styles();
  const history = useHistory();
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
      <Card className="item-card" key={index} style={{ boxShadow: "none" }}>
        <CardActionArea
          onClick={() => props.openItemHandler(index, item.username)}
        >
          <LazyLoadImage
            className="item-image"
            src={item.url}
            alt="Image Alt"
            effect="blur"
          />
          <CardContent>
            <Typography
              className="item-title"
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
      <Card
        className="artist-item-card"
        key={index}
        style={{ boxShadow: "none" }}
      >
        <CardActionArea
          onClick={() => artistPost(item.userID, item.username, item.profpicID)}
        >
          <LazyLoadImage
            className="artist-item-image"
            src={item?.previewUrl}
            alt="Image Alt"
            effect="blur"
          />

          <Avatar
            className="artist-avatar"
            style={{
              width: "50px",
              height: "50px",
            }}
            src={item.url}
          ></Avatar>
          <Typography className="artist-username">{item.username}</Typography>
          <CardContent></CardContent>
        </CardActionArea>
      </Card>
    ));
  }
  return props.items.map((item, index) => (
    <Card className="item-card" key={index}>
      <CardActionArea
        onClick={() => props.openItemHandler(index, item.username)}
      >
        <LazyLoadImage
          className="item-image"
          src={item.url}
          alt="Image Alt"
          effect="blur"
        />
        <CardContent>
          <Typography varient="body" data-testid={`image-title`}>
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      {props.icon === "edit" && props.user.userName === item?.username && (
        <div className="edit-icon">
          <IconButton
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
        </div>
      )}
    </Card>
  ));
};

export default Items;
