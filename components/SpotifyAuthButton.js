import React from 'react';
import { Button } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyAuthButton = ({ onLoginSuccess, style }) => {
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
    <Button
      disabled={!request}
      title="Login with Spotify"
      onPress={() => {
        promptAsync();
      }}
      color="#1DB954" // Apply the background color directly to the Button using the color prop
      style={style} // You can still keep the style prop to add additional styles if needed
    />
  );
};

export default SpotifyAuthButton;
