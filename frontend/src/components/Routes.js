import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from './ErrorPage';
import Home from './Homepage/Home';
import Login from './Login/Login';
import DigitalWallet from './Dashboard/User/DigitalWallet';
import InformationRequests from './Dashboard/User/InformationRequests';
import ApprovalRequests from './Dashboard/Verifier/ApprovalRequests';
import ApprovalRequestInfo from './Dashboard/Verifier/ApprovalRequestInfo';
import SentRequests from './Dashboard/Client/SentRequests';

export default function Routes() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route path="/error" component={ErrorPage} />
      <ProtectedRoute path="/user/wallet" component={DigitalWallet} />
      <ProtectedRoute path="/user/requests" component={InformationRequests} />
      <ProtectedRoute path="/verifier/requests" component={ApprovalRequests} />
      <ProtectedRoute
        path="/verifier/requestinfo/:id"
        component={ApprovalRequestInfo}
      />
      <ProtectedRoute path="/client/requests" component={SentRequests} />
    </Router>
  );
}
