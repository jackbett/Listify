import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAlbumTracks } from "../api/SpotifyApi"; // Import the custom hook for album tracks
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../api/AuthService";

const AlbumDetailScreen = ({ route }) => {
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;

  const { album } = route.params; // Assuming album is passed as a parameter
  const navigation = useNavigation();

  const { albumTracks, fetchAlbumTracks } = useAlbumTracks(accessToken, album.id);
  const [dataLoaded, setDataLoaded] = useState(false);

  const openInSpotify = () => {
    if (album.uri) {
      Linking.openURL(album.uri).catch((err) =>
        console.error("Couldn't open URL:", err)
      );
    } else {
      console.log("Album URI not available");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await fetchAlbumTracks(); // Fetch album tracks using the custom hook
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const renderAlbumTracks = () => {
    console.info(albumTracks)
    if (!dataLoaded || !albumTracks) {
      return <ActivityIndicator size="small" color="#1DB954" />;
    }

    return (
      <FlatList
        data={albumTracks.items}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TrackDetails", { track: item, albumImage: album.images[0].url })}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <Image
                source={
                  album && album.images.length > 0
                    ? { uri: album.images[0].url }
                    : null
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 0,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {`${item.name}`}
                </Text>
                <Text style={{ color: "lightgray", fontSize: 14 }}>
                  <Text>{item.popularity}</Text>
                  <Text>{" Popularity Score"}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#040306" }}>
      {/* Album image with overlapping buttons and header */}
      <View style={{ height: 300, position: "relative" }}>
        {/* Replace this section with album image */}
        {album.images && album.images.length > 0 ? (
          <Image
            source={{ uri: album.images[0].url }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          // Display placeholder or default image
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#333",
            }}
          >
            <Text style={{ color: "white" }}>No Image Available</Text>
          </View>
        )}
        {/* Back button */}
        <View
          style={{
            paddingTop: 30,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={46}
              color="#d3d3d3"
            />
          </TouchableOpacity>
        </View>
        {/* Album name centered at the bottom */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {/* Display album name */}
          <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>
            Album: {album.name}
          </Text>
        </View>
      </View>
      {/* Open in Spotify button */}
      <TouchableOpacity onPress={openInSpotify}>
        <Text style={{ color: "#1DB954", fontSize: 16, marginTop: 10 }}>
          Open in Spotify
        </Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        {/* Rest of the content */}
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          {/* Display album tracks */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Album Tracks
            </Text>
            {/* Render album tracks */}
            {renderAlbumTracks()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AlbumDetailScreen;
