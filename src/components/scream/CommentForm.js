import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearErorros, submitComment } from "../../redux/actions/dataAction";
import { styles } from "../../util/theme";

function CommentForm({
  classes,
  submitComment,
  UI,
  authenticated,
  screamId,
  clearErorros,
}) {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(screamId, { body });
  };

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
    }
  }, [UI]);

  return (
    <Fragment>
      {authenticated ? (
        <Grid item sm={12} style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              label="Comment on scream"
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ float: "right", marginBottom: 10 }}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : null}
    </Fragment>
  );
}

const mapStateToProps = ({ UI, user }) => {
  return {
    UI,
    authenticated: user.authenticated,
  };
};

export default connect(mapStateToProps, { submitComment, clearErorros })(
  withStyles(styles)(CommentForm)
);
