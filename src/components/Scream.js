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

const Scream = ({ scream, user, likeScream, unlikeScream, classes }) => {
  dayjs.extend(relativeTime);

  const isLikedScream = () => {
    if (
      user.likes &&
      user.likes.find((like) => like.screamId === scream.screamId)
    ) {
      return true;
    } else return false;
  };

  const likedScream = () => {
    likeScream(scream.screamId);
  };

  const unlikedScream = () => {
    unlikeScream(scream.screamId);
  };

  const likeButton = !user.authenticated ? (
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

  return (
    <Card className={classes.card}>
      <CardMedia
        image={scream.userImage}
        title="Profile image"
        className={classes.images}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.userHandle}`}
          color="primary"
        >
          {scream.userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream.body}</Typography>
        {likeButton}
        <span>{scream.likeCount} Likes</span>
        <MyButton tip="comments">
          <Chat color="primary" />
        </MyButton>
        <span>{scream.commentCount} comments</span>
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
