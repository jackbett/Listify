// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { authenticateWithSpotify } from './AuthenticationService'; // Update the import path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const handleLogin = async () => {
    try {
      const token = await authenticateWithSpotify();
      setUserToken(token);
    } catch (error) {
      console.log('Authentication error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
