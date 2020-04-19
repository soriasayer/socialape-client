import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import { styles } from "../../util/theme";
import DeleteScream from "./DeleteScream";
import LikeButton from "./LikeButton";
import ScreamDialog from "./ScreamDialog";

const Scream = ({ scream, user, classes, userCredential }) => {
  dayjs.extend(relativeTime);

  const { authenticated, credential } = user;
  const {
    screamId,
    userHandle,
    userImage,
    createdAt,
    body,
    likeCount,
    commentCount,
  } = scream;

  const deletButton =
    authenticated && userHandle === credential.handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.images}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deletButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <Chat color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog SId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withStyles(styles)(Scream));
