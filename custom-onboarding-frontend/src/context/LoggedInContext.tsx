import React, { createContext, useContext, useEffect, useState } from 'react';
import { validateToken } from '../api/userApi';

// Context to manage logged in status
const LoggedInContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  emailVal: string | null;
  setEmailVal: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  emailVal: null,
  setEmailVal: () => {},
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
  const [emailVal, setEmailVal] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await getInitialLogInVal();
      setIsLoggedIn(loginStatus);
    };
  
    checkLoginStatus();
  }, []);
  
  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, emailVal, setEmailVal }}>
      {children}
    </LoggedInContext.Provider>
  );
};
