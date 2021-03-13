import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.token) {
          const regex = new RegExp(localStorage.userType, 'g');
          const url = props.location.pathname;
          if (localStorage.userType && url.match(regex)) {
            return <Component {...props} />;
          }

          return (
            <Redirect
              to={{
                pathname: '/error',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}
