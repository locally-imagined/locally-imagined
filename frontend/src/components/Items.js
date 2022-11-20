import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
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
      {props.icon === "favorite" && (
        <IconButton
          className={classes.favoriteIcon}
          onClick={(event) => props.favoriteHandler(event)}
          id={index}
        >
          <FavoriteIcon />
        </IconButton>
      )}
      {props.icon === "edit" && (
        <IconButton
          className={classes.favoriteIcon}
          onClick={() => {
            props.openItemHandler(index);
            props.setOpenEdit(true);
          }}
          id={index}
        >
          <EditIcon />
        </IconButton>
      )}

      <CardActionArea onClick={() => props.openItemHandler(index)}>
        <LazyLoadImage
          className={classes.image}
          src={item.url}
          alt="Image Alt"
          effect="blur"
        />

        <CardContent>
          <Typography className={classes.itemTitle} varient="body">
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
};

export default Items;
