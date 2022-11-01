import React from "react";
import { Toolbar, Container, Grid, Drawer, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles";
import states from "../states";

/**
 * lefr bar
 * @return {object} JSX
 */
const LeftBar = () => {
  const history = useHistory();
  const classes = styles();
  const [search, setSearch] = useState([]);
  return (
    <Grid item sm={3}>
      <Drawer variant="permanent">
        <Container className={classes.leftbar}>
          <Toolbar />

          <Grid className={classes.topbar}>
            <Autocomplete
              disablePortal
              className={classes.search}
              options={states.items}
              filterSelectedOptions
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => console.log(value)}
              renderInput={(params) => (
                <TextField {...params} label="Search Marketplace" />
              )}
            />
          </Grid>
        </Container>
      </Drawer>
    </Grid>
  );
};

export default LeftBar;
