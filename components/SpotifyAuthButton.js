import React, { useEffect, useContext, useRef } from "react";
import { Pressable, Text } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { AuthContext } from "../api/AuthService";

const SpotifyAuthButton = () => {
  const { state, getAccessToken } = useContext(AuthContext);
  const hasHandledAuthResponse = useRef(false);

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

  const [request, response, promptAsync] = useAuthRequest(
    authCodeConfig,
    authCodeDiscovery
  );

  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === "success" && !hasHandledAuthResponse.current) {
        console.log("Authentication successful. Retrieving access token...");
        const authorizationCode = response.params.code;
        getAccessToken(authorizationCode);
        hasHandledAuthResponse.current = true;
      } else if (response?.type === "error" && response.error === "invalid_grant") {
        console.log("Token has expired. Please log in again.");
      }
    };

    handleAuthResponse();
  }, [response, getAccessToken]);

  const handleLogin = () => {
    console.log("Login button pressed. Initiating authentication...");
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
