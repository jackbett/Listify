import React, { createContext, useState } from "react";

const AuthContext = createContext();

const initialState = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
  clientId: "c7aa783dc6ec4440886b382a9fd31e79",
  secretId: "9773862fc3794b5eab58e94953f81e9d",
  codeResponseType: "code",
  redirectUri:
    "exp://jp-f6y.jackabett.listify.exp.direct:80/--/spotify-auth-callback",
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

  const setAuthStates = (
    returnedCode,
    accessToken,
    tokenType,
    tokenExpiresIn,
    refreshToken
  ) => {
    setState({
      ...state,
      returnedCode: returnedCode,
      accessToken: accessToken,
      tokenType: tokenType,
      tokenExpiresIn: tokenExpiresIn,
      refreshToken: refreshToken,
    });
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
