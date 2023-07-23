import * as AuthSession from 'expo-auth-session';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      issuer: "https://accounts.spotify.com",
      clientId: "c7aa783dc6ec4440886b382a9fd31e79",
      redirectUrl: "http://localhost:19006/",
      scopes: [
        "playlist-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
        "user-top-read",
      ],
    };
  }

  async onLogin() {
    try {
      const authUrl = `${this.spotifyAuthConfig.issuer}/authorize?client_id=${this.spotifyAuthConfig.clientId}&redirect_uri=${encodeURIComponent(this.spotifyAuthConfig.redirectUrl)}&response_type=code&scope=${this.spotifyAuthConfig.scopes.join('%20')}`;
      console.log("Auth URL:", authUrl); // Add this line to check the authUrl value in the console
  
      const result = await AuthSession.startAsync({ authUrl });
      console.log("Authorize Result:", result);
      return result;
    } catch (error) {
      console.log("Authorization Error:", error);
      throw error;
    }
  }

  async refreshLogin(refreshToken) {
    try {
      const result = await AuthSession.refreshAsync(this.spotifyAuthConfig, {
        refreshToken: refreshToken,
      });
      return result;
    } catch (error) {
      console.log("Refresh Error:", error);
      throw error;
    }
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
