import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Link,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../styles";

const Items = (props) => {
  const classes = styles();

  return props.items.map((item, index) => (
    <Card className={classes.item} key={index}>
      {/* {props.icon === "favorite" && (
        <IconButton
          className={classes.favoriteIcon}
          onClick={(event) => props.favoriteHandler(event)}
          id={index}
        >
          <FavoriteIcon />
        </IconButton>
      )} */}
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
        data-testid={`open-image-${index}`}
      >
        <LazyLoadImage
          className={classes.image}
          src={item.url}
          alt="Image Alt"
          effect="blur"
          data-testid={`image-${index}`}
        />

        <CardContent>
          <Typography
            className={classes.itemTitle}
            varient="body"
            data-testid={`image-${index}-title`}
          >
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
};

export default Items;
