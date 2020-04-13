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
import { loginUser } from "../redux/actions/userAction";

const Login = ({ classes, history, loginUser, user, UI }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    loginUser(userData, history);
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
          Login
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
            Login
            {UI.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <div>
            Don't have an account? signup <Link to="/signup">here</Link>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToprops = ({ user, UI }) => {
  return {
    user,
    UI,
  };
};

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToprops,
  mapActionsToProps
)(withStyles(styles)(Login));
