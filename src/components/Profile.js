import React, { Fragment } from "react";
import { withStyles, Button, Paper, Typography } from "@material-ui/core";
import { LocationOn, CalendarToday, InsertLink } from "@material-ui/icons";
import MuiLink from "@material-ui/core/Link";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styles } from "../util/theme";
import dayjs from 'dayjs'

function Profile({ classes, user }) {
  const {
    credential,
    authenticated,
    loading,
  } = user;

  const profileMarkup = () => {
    console.log("it is user", user);
    return !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={credential.imageURL} alt="profile" className="profile-image"/>
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
            {credential.bio && <Typography variant="body2">{credential.bio}</Typography>}
            <hr />
            {credential.location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{credential.location}</span>
              </Fragment>
            )}
            {credential.website && (
              <Fragment>
              <InsertLink color='primary'/>
              <a href={credential.website} target='_blank' rel='noopener noreferrer'>
              {' '}{credential.website}
              </a>
              <hr/>
              </Fragment>
            )}
            <CalendarToday color='primary'/>{' '}
            <span>Joined {dayjs(credential.createdAt).format('MMM YYY')} </span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
        No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
        <Button variant='contained' color='primary' component={Link} to='/login'>
        Login
        </Button>
        <Button variant='contained' color='secondary' component={Link} to='/signup'>
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

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
