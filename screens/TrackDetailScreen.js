import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../api/AuthService";

const SongDetailsScreen = ({ route }) => {
  const { track } = route.params;
  console.log("Song item:", track);

  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;
  const [dataLoaded, setDataLoaded] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const topPadding = screenHeight * 0.08;
  const imageSize = screenHeight * 0.4;

  const imageSizee = 300; // Adjust this size according to your requirement
  const topPaddinge = 30; // Top padding for the header

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
  };

  const extractYearFromDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  };

  useEffect(() => {
    // Fetch song details or additional data here as needed
    // Example: Fetch song information using the song ID or other relevant data
    // setDataLoaded(true); // Set dataLoaded to true when data is fetched
  }, [accessToken]);



  return (
    <View style={{ flex: 1, backgroundColor: '#040306' }}>
      {/* Song image with overlapping buttons and header */}
      <View style={{ height: imageSize, position: 'relative' }}>
        {/* Replace the source with the song image */}
        <Image
          source={{ uri: track.album.images[0].url }} // Assuming the song object has an "album" property containing image URLs
          style={{ width: '100%', height: imageSize, position: 'absolute' }}
        />
        {/* Back icon as a header */}
        <View style={{ paddingTop: topPadding, padding: 10, flexDirection: 'row', alignItems: 'center', position: 'absolute' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-sharp" size={46} color="#d3d3d3" />          
          </TouchableOpacity>
        </View>
        {/* Song name centered at the bottom */}
        <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', paddingBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 38, fontWeight: 'bold' }}>
            {track.name} {/* Assuming song object has a "name" property */}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Rest of the content */}
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          {/* Display song information */}
          <View style={{ marginTop: 20 }}>
            {/* Sample text for song details */}
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>
              Song Information
            </Text>
            <Text style={{ color: 'white', fontSize: 16 }}>
              {/* Replace with song information */}
              {/* Example: Artist, album, release date, duration, etc. */}
              Artist: {track.artists[0].name} {/* Assuming song object has an "artists" array */}
            </Text>
            {/* Add more song information here */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SongDetailsScreen;
