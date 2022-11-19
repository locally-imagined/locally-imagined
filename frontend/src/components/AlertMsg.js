import React from "react";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

import styles from "../styles";

const AlertMsg = (props) => {
  const classes = styles();
  return (
    <Collapse in={props.error || props.success}>
      <Alert
        severity={props.type}
        className={classes.errorMsg}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              if (props.type === "error") props.setError(false);
              if (props.type === "success") props.setSucess(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {props.msg}
      </Alert>
    </Collapse>
  );
};
export default AlertMsg;