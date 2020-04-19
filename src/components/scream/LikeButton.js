import { Favorite, FavoriteBorder } from "@material-ui/icons";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { likeScream, unlikeScream } from "../../redux/actions/dataAction";
import MyButton from "../../util/MyButton";

function LikeButton({ likeScream, unlikeScream, user, screamId }) {
  const { likes, authenticated } = user;

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

  return (
    <Fragment>
      {!authenticated ? (
        <Link to="/login">
          <MyButton tip="Like">
            <FavoriteBorder color="primary" />
          </MyButton>
        </Link>
      ) : isLikedScream() ? (
        <MyButton tip="Unlike" onClick={unlikedScream}>
          <Favorite color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={likedScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )}
    </Fragment>
  );
}

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
