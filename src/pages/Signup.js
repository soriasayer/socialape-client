import React, { useState, useEffect } from "react";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AppIcon from "../images/logo192.png";
import { styles } from "../util/theme";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userAction";

const Signup = ({ classes, history, signupUser, UI }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    signupUser(newUserData, history);
  };

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI]);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="react" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={UI.loading}
          >
            Signup
            {UI.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <div>
            Already have an account? login <Link to="/login">here</Link>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = ({ user, UI }) => {
  return {
    user,
    UI,
  };
};

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
