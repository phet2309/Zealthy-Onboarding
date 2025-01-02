import React, { createContext, useContext, useEffect, useState } from 'react';
import { validateToken } from '../api/userApi';

// Context to manage logged in status
const LoggedInContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

const getInitialLogInVal = async (): Promise<boolean> => {
  const jwtToken = localStorage.getItem('jwt');
  if(jwtToken === null) return false;
  const isValid = await validateToken();
  return isValid;
};

export const useLoggedIn = () => useContext(LoggedInContext);

export const LoggedInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await getInitialLogInVal();
      setIsLoggedIn(loginStatus);
    };
  
    checkLoginStatus();
  }, []);
  
  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};
