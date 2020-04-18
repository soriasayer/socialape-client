import React, { useState, useEffect, Fragment } from "react";
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { styles } from "../util/theme";
import MyButton from "../util/MyButton";
import { connect } from "react-redux";
import { postScream, clearErorros } from "../redux/actions/dataAction";
import { Add, Close } from "@material-ui/icons";

function PostScream({ UI, postScream, classes, clearErorros }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    postScream({ body });
  };

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, [UI]);

  const handleClose = () => {
    clearErorros();
    setOpen(false);
    setErrors({});
  };

  return (
    <Fragment>
      <MyButton onClick={() => setOpen(true)} tip="Post a Scream!">
        <Add />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          btnClassName={classes.btnClose}
          onClick={handleClose}
        >
          <Close />
        </MyButton>
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow appes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = ({ UI }) => ({ UI });

export default connect(mapStateToProps, { postScream, clearErorros })(
  withStyles(styles)(PostScream)
);
