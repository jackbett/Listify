import { useEffect, useContext } from "react";
import { Pressable, Text } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { AuthContext } from "../contexts/AuthContext";
import { encode } from "base-64";

WebBrowser.maybeCompleteAuthSession();

const SpotifyAuthButton = ({ onLoginSuccess }) => {
  const {
    state,
    setReturnedCode,
    setAccessToken,
    setTokenType,
    setTokenExpiresIn,
    setRefreshToken,
  } = useContext(AuthContext);

  const authCodeConfig = {
    clientId: state.clientId,
    redirectUri: state.redirectUri,
    responseType: state.responseType,
    scopes: state.scope,
    usePKCE: false,
  };

  const authCodeDiscovery = {
    authorizationEndpoint: state.authorizationEndpoint,
  };

  const [request, response, promptAsync] = useAuthRequest(authCodeConfig, authCodeDiscovery);

  const getAccessToken = async (authCode) => {
    try{
        const tokenResponse = await fetch(state.tokenEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + encode(`${state.clientId + ':' + state.secretId}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=' + state.authCodeGrantType + '&code=' + authCode + '&redirect_uri=' + state.redirectUri + '',
        });
        const tokenResponseJson = await tokenResponse.json();
        console.log(tokenResponseJson.access_token);
        setAccessToken(tokenResponseJson.access_token);
        // console.log(state.access_token);
        // setTokenType(tokenResponseJson.token_type);
        // setTokenExpiresIn(tokenResponseJson.expires_in);
        // setRefreshToken(tokenResponseJson.refresh_token);
    }
    catch(e) {
        console.error(e);
    }
    finally{
        onLoginSuccess();
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
        const authorizationCode = response.params.code;
        setReturnedCode(authorizationCode);
        getAccessToken(authorizationCode);
    }
    else if (response?.type === "error" && response.error === "invalid_grant") {
      console.log("Token has expired. Please log in again.");
    }
  }, [response]);

  const handleLogin = () => {
    promptAsync();
  };

  return (
    <Pressable
      disabled={!request}
      onPress={handleLogin}
      style={{
        backgroundColor: "#1DB954",
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>Login with Spotify</Text>
    </Pressable>
  );
};

export default SpotifyAuthButton;
