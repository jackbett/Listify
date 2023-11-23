import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../api/AuthService";

const SongDetailsScreen = ({ route }) => {
  const { track, albumImage } = route.params; //we can maybe change this if im doing a call to get song information anyways
  console.log("Song item:", track);

  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;
  const [dataLoaded, setDataLoaded] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const imageSize = screenHeight * 0.4;

  const handleScroll = (event) => {
    // Function to handle scroll events
    // You can implement this as needed
  };

  const openInSpotify = () => {
    if (track.uri) {
      Linking.openURL(track.uri).catch((err) =>
        console.error("Couldn't open URL:", err)
      );
    } else {
      console.log("Song URI not available");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#040306" }}>
      {/* Song image with overlapping buttons and header */}
      <View style={{ height: imageSize, position: "relative" }}>
        {/* Replace the source with the song image */}
        {/* todo  if else else for no images avail...*/}
        {    track.album?.images && track.album.images.length > 0? ( 
          <Image
            source={{ uri: track.album.images[0].url }}
            style={{ width: "100%", height: imageSize, position: "absolute" }}
          />
        ):
        <Image
            source={{ uri: albumImage }}
            style={{ width: "100%", height: imageSize, position: "absolute" }}
          />
        }
        {/* Back icon as a header */}
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-sharp" size={46} color="#d3d3d3" />
          </TouchableOpacity>
        </View>
        {/* Song name centered at the bottom */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>
            {track.name}
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
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Song Information
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              Artist: {track.artists[0].name}
            </Text>
            {/* Open in Spotify button */}
            <TouchableOpacity onPress={openInSpotify}>
              <Text
                style={{
                  color: "#1DB954",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Open in Spotify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SongDetailsScreen;
