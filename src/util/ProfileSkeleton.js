import { Paper, withStyles } from "@material-ui/core";
import { CalendarToday, Link, LocationOn } from "@material-ui/icons";
import React from "react";
import NoImage from "../images/default-img.png";
import { styles } from "../util/theme";

function ProfileSkeleton({ classes }) {
  return (
    <Paper className={classes.Paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImage} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div
            className={classes.handle}
            style={{ margin: "0 auto 7px auto" }}
          />
          <hr />
          <div
            className={classes.fullLine}
            style={{ margin: "0 auto 7px auto" }}
          />
          <div
            className={classes.fullLine}
            style={{ margin: "0 auto 7px auto" }}
          />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <Link color="primary" />
          https://github.com/soriasayer
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ProfileSkeleton);
