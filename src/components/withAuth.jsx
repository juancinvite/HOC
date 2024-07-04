
import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = () => {
      return localStorage.getItem('authenticated') === 'true';
    };

    return isAuthenticated() ? <Component {...props} /> : <Navigate to="/login" />;
  };
};

export default withAuth;