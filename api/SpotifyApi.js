import { useState, useEffect } from 'react';

const useUserProfile = (accessToken) => {
  const [userProfile, setUserProfile] = useState(null);

  const updateUserProfile = async () => {
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

  useEffect(() => {
    updateUserProfile();
  }, [accessToken]);

  return { userProfile, updateUserProfile };
};

const useCurrentlyPlaying = (accessToken) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const updateCurrentlyPlaying = async () => {
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

  useEffect(() => {
    updateCurrentlyPlaying();
  }, [accessToken]);

  return { currentlyPlaying, updateCurrentlyPlaying };
};

const useTopArtists = (accessToken, timeRange = 'medium_term') => {
  const [topArtists, setTopArtists] = useState(null);

  const updateTopArtists = async () => {
    try {
      const limit = 50; // Set the limit to 50

      const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTopArtists(data.items);
      } else {
        console.error('Error fetching top artists:', response.status);
      }
    } catch (e) {
      console.error('Error fetching top artists:', e.message);
    }
  };

  useEffect(() => {
    updateTopArtists();
  }, [accessToken, timeRange]);

  return { topArtists, updateTopArtists };
};


const useTopTracks = (accessToken, timeRange = 'medium_term') => {
  const [topTracks, setTopTracks] = useState(null);

  const updateTopTracks = async () => {
    try {
      const limit = 50;

      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTopTracks(data.items);
      } else {
        console.error('Error fetching top tracks:', response.status);
      }
    } catch (e) {
      console.error('Error fetching top tracks:', e.message);
    }
  };

  useEffect(() => {
    updateTopTracks();
  }, [accessToken, timeRange]);

  return { topTracks, updateTopTracks };
};

export { useUserProfile, useCurrentlyPlaying, useTopArtists, useTopTracks };
