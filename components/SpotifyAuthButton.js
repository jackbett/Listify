// SpotifyAuthButton.js
import React from 'react';
import { Pressable, Text } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyAuthButton = ({ onLoginSuccess }) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'c7aa783dc6ec4440886b382a9fd31e79',
      scopes: ['user-read-email', 'playlist-modify-public'],
      usePKCE: false,
      redirectUri: makeRedirectUri({ scheme: 'your.app' }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Call the onLoginSuccess function and pass the code
      onLoginSuccess(code);
    }
  }, [response, onLoginSuccess]);

  return (
    <Pressable
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
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
      <Text style={{ color: 'white', fontSize: 16 }}>Login with Spotify</Text>
    </Pressable>
  );
};

export default SpotifyAuthButton;
