import React, { Fragment } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Add, Home, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MyButton from "../util/MyButton";

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <MyButton tip="Post a Scream!">
              <Add />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <Home />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
