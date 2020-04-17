import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  withStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { styles } from "../util/theme";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataAction";
import MyButton from "../util/MyButton";
import { Chat, FavoriteBorder, Favorite } from "@material-ui/icons";
import DeleteScream from "./DeleteScream";

const Scream = ({
  scream,
  user,
  likeScream,
  unlikeScream,
  classes,
  userCredential,
}) => {
  dayjs.extend(relativeTime);

  const { likes, authenticated, credential } = user;
  const {
    screamId,
    userHandle,
    userImage,
    createdAt,
    body,
    likeCount,
    commentCount,
  } = scream;

  const isLikedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else return false;
  };

  const likedScream = () => {
    likeScream(screamId);
  };

  const unlikedScream = () => {
    unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : isLikedScream() ? (
    <MyButton tip="Unlike" onClick={unlikedScream}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likedScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
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
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <Chat color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
};

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
