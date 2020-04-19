import { Grid, Typography, withStyles } from "@material-ui/core";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../util/theme";

function Comments({ comments, classes }) {
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userHandle, userImage } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={3}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImg}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(Comments);
