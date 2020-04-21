import { Card, CardContent, CardMedia, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import NoImage from "../images/default-img.png";
import { styles } from "../util/theme";

function ScreamSkeleton({ classes }) {
  return (
    <Fragment>
      {Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
          <CardMedia className={classes.cover} image={NoImage} />
          <CardContent className={classes.cardContent}>
            <div className={classes.handle} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
          </CardContent>
        </Card>
      ))}
    </Fragment>
  );
}

export default withStyles(styles)(ScreamSkeleton);
