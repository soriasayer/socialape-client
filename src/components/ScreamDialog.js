import React, { Fragment, useState } from "react";
import {
  withStyles,
  DialogContent,
  Dialog,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataAction";
import { styles } from "../util/theme";
import MyButton from "../util/MyButton";
import { UnfoldMore, Close } from "@material-ui/icons";

function ScreamDialog({ classes, getScream, scream, UI, SId }) {
  const {
    screamId,
    body,
    userHandle,
    createdAt,
    commentCount,
    likeCount,
    userImage,
  } = scream;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(SId);
  };

  const dialogMarkup = () => {
    if (UI.loading) {
      return <CircularProgress size={150} />;
    } else {
      return (
        <Grid container spacing={16}>
          <Grid item sm={5}>
            <img
              src={userImage}
              alt="Profile"
              className={classes.profileImage}
            />
          </Grid>
          <Grid item sm={7}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        btnClassName={classes.expandBtn}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          btnClassName={classes.btnClose}
          onClick={() => setOpen(false)}
        >
          <Close />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup()}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = ({ data, UI }) => {
  return {
    scream: data.scream,
    UI,
  };
};

export default connect(mapStateToProps, { getScream })(
  withStyles(styles)(ScreamDialog)
);
