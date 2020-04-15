import React, { useState, useEffect, Fragment } from "react";
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { styles } from "../util/theme";
import MyButton from "../util/MyButton";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userAction";
import { Edit } from "@material-ui/icons";

function EditDetail({ credential, classes, editUserDetails }) {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  const handleOpen = (credential) => {
    setOpen(true);
    mapUserDetailsToState(credential);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credential);
  }, [credential]);

  const mapUserDetailsToState = (credential) => {
    if (credential.bio) {
      setBio(credential.bio);
    } else if (credential.website) {
      setWebsite(credential.website);
    } else if (credential.location) {
      setLocation(credential.location);
    }
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.editButton}
      >
        <Edit color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <TextField
            name="bio"
            type="text"
            label="Bio"
            multiline
            rows="3"
            placeholder="A short bio about youself"
            className={classes.textField}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
          />
          <TextField
            name="website"
            type="text"
            label="Website"
            placeholder="Your personal/professinal website"
            className={classes.textField}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
          />
          <TextField
            name="location"
            type="text"
            label="Location"
            placeholder="Where do you live?"
            className={classes.textField}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    credential: user.credential,
  };
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetail)
);
