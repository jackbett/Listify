import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useArtistTopTracks, useArtistInfo } from '../api/SpotifyApi'; // Import the custom hook for artist top tracks
import { AuthContext } from "../api/AuthService";
import { Ionicons } from '@expo/vector-icons';
import GenreBubbles from '../components/GenreBubbles'; // Import the GenreBubbles component

const ArtistDetailsScreen = ({ route }) => {
  const { artist } = route.params;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;
  const [dataLoaded, setDataLoaded] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const topPadding = screenHeight * 0.08;
  const imageSize = screenHeight * 0.4;

  // Fetch top 10 tracks for the specific artist ID
  const { artistTopTracks, fetchArtistTopTracks } = useArtistTopTracks(accessToken, artist.id); 
  // const { artistInfo, fetchArtistInfo } = useArtistInfo(accessToken, artist.id); 

  const fetchData = async () => {
    try {
      await fetchArtistTopTracks(artist.id);
      // await fetchArtistInfo(artist.id); // Pass artist.id here
      setDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const renderTopTracks = () => {
    if (!dataLoaded || !artistTopTracks) {
      return <ActivityIndicator size="small" color="#1DB954" />;
    }

    return (
      <FlatList
        data={artistTopTracks.slice(0, 5)} // Limiting to 5 tracks
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TrackDetails', { track: item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
              <Image
                source={{ uri: item.album.images[0].url }}
                style={{ width: 50, height: 50, borderRadius: 0, marginRight: 10 }}
              />
              <View>
                <Text style={{ color: 'white', fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: 'lightgray', fontSize: 14 }}>
                  <Text>{item.popularity}</Text>
                  <Text>{' Popularity Score'}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#040306' }}>
      {/* Artist image with overlapping buttons and header */}
      <View style={{ height: imageSize, position: 'relative' }}>
        <Image
          source={{ uri: artist.images[0].url }}
          style={{ width: '100%', height: imageSize, position: 'absolute' }}
        />
        {/* Back icon as a header */}
        <View style={{ paddingTop: topPadding, padding: 10, flexDirection: 'row', alignItems: 'center', position: 'absolute' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-sharp" size={46} color="#d3d3d3" />          
          </TouchableOpacity>
        </View>
        {/* Artist name centered at the bottom */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', paddingBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 38, fontWeight: 'bold' }}>
            {artist.name}
          </Text>
        </View>

      </View>

      {/* Rest of the content */}
      <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
        {/* Display top tracks */}

  {/* Display artist's genres in bubbles */}
  {dataLoaded && artist && artist.genres && (
          <View>
            <Text style={{ color: 'white', fontSize: 20, marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
              Genres
            </Text>
            <GenreBubbles genres={artist.genres} />
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>
            Top Tracks
          </Text>
          {/* Render top tracks */}
          {renderTopTracks()}
        </View>
      </View>
    </View>
  );
};

export default ArtistDetailsScreen;
