import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './Homepage/Home';
import Login from './Login/Login';
import DigitalWallet from './Dashboard/User/DigitalWallet';
import InformationRequests from './Dashboard/User/InformationRequests';
import ApprovalRequests from './Dashboard/Verifier/ApprovalRequests';
import SentRequests from './Dashboard/Client/SentRequests';

export default function Routes() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route path="/user/wallet" component={DigitalWallet} />
      <Route path="/user/requests" component={InformationRequests} />
      <Route path="/verifier/requests" component={ApprovalRequests} />
      <Route path="/client/requests" component={SentRequests} />
    </Router>
  );
}
