import { createContext, useState } from "react";

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
  returnedCode: "",
  authCodeGrantType: "authorization_code",
  contentTypeHeader: "application/x-www-form-urlencoded",
  accessToken: "",
  tokenType: "",
  tokenExpiresIn: "",
  refreshToken: "",
  refreshGrantType: "refresh_token",
};

function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  const setReturnedCode = (returnedCode) => {
    setState({
      ...state,
      returnedCode: returnedCode,
    });
  };

  const setAccessToken = (accessToken) => {
    setState({
      ...state,
      accessToken: accessToken,
    });
  };

  const setTokenType = (tokenType) => {
    setState({
      ...state,
      tokenType: tokenType,
    });
  };

  const setTokenExpiresIn = (tokenExpiresIn) => {
    setState({
      ...state,
      tokenExpiresIn: tokenExpiresIn,
    });
  };

  const setRefreshToken = (refreshToken) => {
    setState({
      ...state,
      refreshToken: refreshToken,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        setReturnedCode,
        setAccessToken,
        setTokenType,
        setTokenExpiresIn,
        setRefreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
