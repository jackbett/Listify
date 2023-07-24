import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyAuthButton = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'c7aa783dc6ec4440886b382a9fd31e79',
      scopes: ['user-read-email', 'playlist-modify-public'],
      usePKCE: false,
      redirectUri: "exp://jp-f6y.jackabett.listify.exp.direct:80/--/spotify-auth-callback", // Replace this with your actual redirect URI
    },
    discovery
  );

  const navigation = useNavigation(); // Access the navigation object

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Call the onLoginSuccess function and pass the code
      onLoginSuccess(code);
      setIsLoggedIn(true); // Set the login status to true when the user successfully logs in
      // Close the login web browser and navigate to your home page
      navigation.navigate('Main'); // Replace 'Main' with the name of your home screen
    }
  }, [response, onLoginSuccess, navigation]);

  React.useEffect(() => {
    // Check if the response contains an expired token
    if (response?.type === 'error' && response.error === 'invalid_grant') {
      // Handle the expired token here (e.g., prompt the user to log in again)
      console.log('Token has expired. Please log in again.');
      setIsLoggedIn(false); // Set the login status to false when the token has expired
    }
  }, [response]);

  const handleLogin = () => {
    // When the button is pressed, prompt the user to log in
    promptAsync();
  };

  return (
    <Pressable
      disabled={!request || isLoggedIn} // Disable the button when already logged in
      onPress={handleLogin} // Use the handleLogin function to prompt the user to log in
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
