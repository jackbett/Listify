// AuthenticationService.js
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const redirectUri = makeRedirectUri({ native: 'jp-f6y.jackabett.listify.exp.direct' });

export const authenticateWithSpotify = async () => {
  const [request, response, promptAsync] = useAuthRequest({
    clientId: 'c7aa783dc6ec4440886b382a9fd31e79',
    scopes: ['user-read-email', 'playlist-modify-public'],
    redirectUri,
  }, discovery);

  const result = await promptAsync();
  if (result?.type === 'success') {
    const { access_token } = result.params;
    await SecureStore.setItemAsync('userToken', access_token);
    return access_token;
  } else {
    throw new Error('Authentication failed');
  }
};
