// AuthProvider.js
import * as WebBrowser from 'expo-web-browser';

import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { encode } from 'base-64';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

const AUTHORIZATION_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CLIENT_ID = "c7aa783dc6ec4440886b382a9fd31e79";
const SECRET_ID = "9773862fc3794b5eab58e94953f81e9d";
const CODE_RESPONSE_TYPE = "code";
const REDIRECT_URI = "exp://jp-f6y.jackabett.listify.exp.direct:80/--/spotify-auth-callback";
const SCOPE = ["user-read-email", "playlist-modify-public", "user-read-currently-playing"];
const AUTH_CODE_GRANT_TYPE = "authorization_code";
const CONTENT_TYPE_HEADER = "application/x-www-form-urlencoded";
const REFRESH_GRANT_TYPE = "refresh_token";
const VALIDATE_ENDPOINT = "https://api.spotify.com/v1/me";

const initialState = {
  authorizationEndpoint: AUTHORIZATION_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: CLIENT_ID,
  secretId: SECRET_ID,
  codeResponseType: CODE_RESPONSE_TYPE,
  redirectUri: REDIRECT_URI,
  scope: SCOPE,
  authCodeGrantType: AUTH_CODE_GRANT_TYPE,
  contentTypeHeader: CONTENT_TYPE_HEADER,
  returnedCode: "",
  accessToken: "",
  tokenType: "",
  tokenExpiresIn: "",
  refreshToken: "",
  refreshGrantType: REFRESH_GRANT_TYPE,
  validationUrl: VALIDATE_ENDPOINT,
};

function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();

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

  const getAccessToken = async (authCode, onLoginSuccess) => {
    WebBrowser.maybeCompleteAuthSession();

    try {
      const tokenResponse = await fetch(state.tokenEndpoint, {
        method: "POST",
        headers: {
          'Cache-Control': 'no-cache',
          'cache':'no-store',
          'Pragma': 'no-cache',
          'Expires': 0,
          Authorization: "Basic " + encode(`${state.clientId}:${state.secretId}`),
          "Content-Type": state.contentTypeHeader,
        },
        body: `show-dialog=true&grant_type=${state.authCodeGrantType}&code=${authCode}&redirect_uri=${state.redirectUri}`,
      });
  
      const tokenResponseJson = await tokenResponse.json();
      setAuthStates(
        authCode,
        tokenResponseJson.access_token,
        tokenResponseJson.token_type,
        tokenResponseJson.expires_in,
        tokenResponseJson.refresh_token
      );
      navigation.navigate('Home', {
        animation: 'slide_from_right', // Custom parameter for animation direction
      });
      // Trigger the callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const validateToken = async () => {
    try {
      const response = await fetch(VALIDATE_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      return response.ok; 
    } catch (error) {
      console.error('Error validating access token:', error);
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const bodyParams = new URLSearchParams({
        grant_type: REFRESH_GRANT_TYPE,
        refresh_token: state.refreshToken,
      });

      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': CONTENT_TYPE_HEADER,
          Authorization: `Basic ${encode(`${CLIENT_ID}:${SECRET_ID}`)}`,
        },
        body: bodyParams.toString(),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const updatedState = {
        ...state,
        accessToken: responseData.access_token,
        tokenType: responseData.token_type,
        tokenExpiresIn: responseData.expires_in,
        refreshToken: responseData.refresh_token || state.refreshToken,
      };

      await SecureStore.setItemAsync('authState', JSON.stringify(updatedState));
      setState(updatedState);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  const signOut = async () => {
     
    try {

      // Clear the authentication state and remove tokens from storage
      await SecureStore.deleteItemAsync('authState');
      
      // Set the authentication state back to the initial state
      setState(initialState);
  
      navigation.navigate('Login', {
        animation: 'slide_from_left',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        state,
        setAuthStates,
        validateToken,
        refreshToken,
        signOut,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
