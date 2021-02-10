import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Homepage/Home";
import Login from "./Login/Login";
import DigitalWallet from "./Dashboard/User/DigitalWallet";
import InformationRequests from "./Dashboard/User/InformationRequests";
import DocumentType from "./Verification/DocumentType";
import DocumentFiles from "./Verification/DocumentFiles";

const history = createBrowserHistory();
export class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/documenttype" component={DocumentType} />
        <Route path="/documentfiles" component={DocumentFiles} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Login} />
        <Route path="/user/wallet" component={DigitalWallet} />
        <Route path="/user/requests" component={InformationRequests} />
      </Router>
    );
  }
}

export default Routes;
