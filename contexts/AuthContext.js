// AuthProvider.js

import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

const initialState = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
  clientId: "c7aa783dc6ec4440886b382a9fd31e79",
  secretId: "9773862fc3794b5eab58e94953f81e9d",
  codeResponseType: "code",
  redirectUri: "exp://jp-f6y.jackabett.listify.exp.direct:80/--/spotify-auth-callback",
  scope: ["user-read-email", "playlist-modify-public"],
  authCodeGrantType: "authorization_code",
  contentTypeHeader: "application/x-www-form-urlencoded",
  returnedCode: "",
  accessToken: "",
  tokenType: "",
  tokenExpiresIn: "",
  refreshToken: "",
  refreshGrantType: "refresh_token",
};

function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const savedState = await SecureStore.getItemAsync('authState');
        if (savedState) {
          setState(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      }
    };

    loadAuthState();
  }, []); // Empty dependency array means it only runs on mount

  const setAuthStates = async (
    returnedCode,
    accessToken,
    tokenType,
    tokenExpiresIn,
    refreshToken
  ) => {
    try {
      const updatedState = {
        ...state,
        returnedCode,
        accessToken,
        tokenType,
        tokenExpiresIn,
        refreshToken,
      };

      await SecureStore.setItemAsync('authState', JSON.stringify(updatedState));
      setState(updatedState);
    } catch (error) {
      console.error('Error updating auth state:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        setAuthStates,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
