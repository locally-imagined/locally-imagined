import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import PaletteIcon from "@mui/icons-material/Palette";
import styles from "../styles";
import states from "../states";

/**
 * category list
 * @return {object} JSX
 */
const Category = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <div>
      <div className={classes.subTitle}>Categories</div>
      <Divider />
      <List className={classes.category}>
        <ListItem button>
          <ListItemIcon>
            <PaletteIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Oil Paint" />
        </ListItem>

        <ListItem button key="oil">
          <ListItemIcon>
            <PaletteIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Water Color" />
        </ListItem>
      </List>
    </div>
  );
};

export default Category;
