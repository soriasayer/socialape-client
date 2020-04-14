import React, { Fragment } from "react";
import {
  withStyles,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {
  LocationOn,
  CalendarToday,
  InsertLink,
  Edit,
} from "@material-ui/icons";
import MuiLink from "@material-ui/core/Link";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styles } from "../util/theme";
import dayjs from "dayjs";
import {logoutUser, uploadImage} from '../redux/actions/userAction'

function Profile({ classes, user, uploadImage }) {
  const { credential, authenticated, loading } = user;

  const handleImageChage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData()
    formData.append('image', image, image.name)
    uploadImage(formData)
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const profileMarkup = () => {
    return !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={credential.imageURL}
                alt="profile"
                className="profile-image"
              />
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChage}
                hidden="hidden"
              />
              <Tooltip title='Edit profile picture' placement='top'>
                <IconButton onClick={handleEditPicture} className="button">
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${credential.handle}`}
                color="primary"
                variant="h5"
              >
                @{credential.handle}
              </MuiLink>
              <hr />
              {credential.bio && (
                <Typography variant="body2">{credential.bio}</Typography>
              )}
              <hr />
              {credential.location && (
                <Fragment>
                  <LocationOn color="primary" />{" "}
                  <span>{credential.location}</span>
                </Fragment>
              )}
              {credential.website && (
                <Fragment>
                  <InsertLink color="primary" />
                  <a
                    href={credential.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {credential.website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>
                Joined {dayjs(credential.createdAt).format("MMM YYYY")}{" "}
              </span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );
  };

  return profileMarkup();
}

const mapDispatchToProps = {
uploadImage,
logoutUser
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
