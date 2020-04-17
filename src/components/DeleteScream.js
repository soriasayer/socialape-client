import React, { Fragment, useState } from "react";
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataAction";
import { styles } from "../util/theme";
import MyButton from "../util/MyButton";

function DeleteScream({ classes, deleteScream, screamId }) {
  const [open, setOpen] = useState(false);

  const handleDeleteScream = () => {
    deleteScream(screamId);
    setOpen(false);
  };
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteBtn}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
