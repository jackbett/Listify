// SpotifyApi.js
import { useState, useEffect } from 'react';

const SpotifyApi = ({ accessToken }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!userProfile) {
        try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          setUserProfile(data);
        } catch (e) {
          console.error(e);
        }
      }
    };

    getProfile();
  }, [userProfile, accessToken]);

  return {
    userProfile,
  };
};

export default SpotifyApi;
