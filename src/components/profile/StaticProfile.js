import { Paper, Typography, withStyles } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import { CalendarToday, InsertLink, LocationOn } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../util/theme";

function StaticProfile({ classes, profile }) {
  const { handle, bio, createdAt, location, website, imageURL } = profile;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageURL} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
            </Fragment>
          )}
          <hr />
          {website && (
            <Fragment>
              <InsertLink color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")} </span>
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(StaticProfile);
