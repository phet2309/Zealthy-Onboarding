import React from 'react';
import { Navigate } from 'react-router';
import { useLoggedIn } from '../context/LoggedInContext';

// Private route component to check if user is logged in
const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn } = useLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/user-onboard-auth" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
