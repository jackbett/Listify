import { useState, useEffect } from 'react';

const useUserProfile = (accessToken) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (e) {
        console.error('Error fetching user profile:', e);
      }
    };

    getUserProfile();
  }, [accessToken]);

  return userProfile;
};

const useCurrentlyPlaying = (accessToken) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    const getCurrentlyPlaying = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentlyPlaying(data);
        } else {
          console.error('Error fetching currently playing:', response.status);
        }
      } catch (e) {
        console.error('Error fetching currently playing:', e.message);
      }
    };

    getCurrentlyPlaying();
  }, [accessToken]);

  return currentlyPlaying;
};

export { useUserProfile, useCurrentlyPlaying };
