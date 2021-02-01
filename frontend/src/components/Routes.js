import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Homepage/Home";
import DocumentType from "./Verification/DocumentType";
import DocumentFiles from "./Verification/DocumentFiles";
import NavBar from "./Header/NavBar";

const history = createBrowserHistory();
export class Routes extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route path="/documenttype" component={DocumentType} />
          <Route path="/documentfiles" component={DocumentFiles} />
        </Router>
      </div>
    );
  }
}

export default Routes;
