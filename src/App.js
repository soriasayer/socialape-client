import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import {appTheme} from './util/theme'
import JwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(appTheme);

let authenticated
const token = localStorage.FBIdToken
if(token) {
  const decodedToken = JwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/login" component={Login} authenticated={authenticated} />
              <AuthRoute path="/signup" component={Signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
