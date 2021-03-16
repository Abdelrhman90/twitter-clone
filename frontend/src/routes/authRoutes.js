import React from "react";
import { Route, Redirect } from "react-router-dom";

export const IsUserRedirect = ({ user, loggedInPath, children, ...props }) => {
  return (
    <Route
      {...props}
      render={() =>
        !user ? children : <Redirect to={{ pathname: loggedInPath }} />
      }
    />
  );
};

export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
