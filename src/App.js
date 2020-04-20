import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import { getUserData, logoutUser } from "./redux/actions/userAction";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import AuthRoute from "./util/AuthRoute";
import { appTheme } from "./util/theme";

const theme = createMuiTheme(appTheme);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/signup" component={Signup} />
              <Route path="/users/:handle" component={User} />
              <Route path="/users/:handle/scream/:screamId" component={User} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
