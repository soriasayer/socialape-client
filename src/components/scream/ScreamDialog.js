import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Chat, Close, UnfoldMore } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getScream } from "../../redux/actions/dataAction";
import MyButton from "../../util/MyButton";
import { styles } from "../../util/theme";
import Comments from "./Comments";
import LikeButton from "./LikeButton";

function ScreamDialog({ classes, getScream, scream, UI, SId }) {
  const {
    screamId,
    body,
    userHandle,
    createdAt,
    commentCount,
    likeCount,
    userImage,
    comments,
  } = scream;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(SId);
  };

  const dialogMarkup = () => {
    if (UI.loading) {
      return (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={150} thickness={2} />;
        </div>
      );
    } else {
      return (
        <Grid container>
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
            <LikeButton screamId={screamId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <Chat color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
          </Grid>
          <hr className={classes.visibleSeparator} />
          <Comments comments={comments} />
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
