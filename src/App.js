import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { appTheme } from "./util/theme";
import JwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import {SET_AUTHENTICATED} from './redux//types'
import {logoutUser, getUserData} from './redux/actions/userAction'
import {connect} from 'react-redux'
import Axios from "axios";

const theme = createMuiTheme(appTheme);

function App({dispatch}) {

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    dispatch(logoutUser())
    window.location.href = "/login";
  } else {
    dispatch({type: SET_AUTHENTICATED})
    Axios.defaults.headers.common['Authorization'] = token
    dispatch(getUserData())
  }
}

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute
              path="/login"
              component={Login}
            />
            <AuthRoute
              path="/signup"
              component={Signup}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default connect(null, {logoutUser})(App);
