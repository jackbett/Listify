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
import { usePlaylistSongs } from "../api/SpotifyApi";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../api/AuthService";


const PlaylistDetailScreen = ({ route }) => {
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;

  const { playlist } = route.params; // Assuming playlist and accessToken are passed as props
  const navigation = useNavigation();

  const { playlistSongs, fetchPlaylistSongs } = usePlaylistSongs(accessToken, playlist.id);

  const [dataLoaded, setDataLoaded] = useState(false);

  // const fetchData = async () => {
  //   try {
      
  //     const fetchedSongs = await fetchPlaylistSongs(accessToken, playlist.id);
  //     setSongs(fetchedSongs.items || []);
  //     setDataLoaded(true);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setDataLoaded(true);
  //   }
  // };

  const openInSpotify = () => {
    if (playlist.uri) {
      Linking.openURL(playlist.uri).catch((err) =>
        console.error("Couldn't open URL:", err)
      );
    } else {
      console.log("Song URI not available");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([
        fetchPlaylistSongs(),
      ]);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const renderPlaylistSongs = () => {
    if (!dataLoaded || !playlistSongs) {
      return <ActivityIndicator size="small" color="#1DB954" />;
    }

    console.log(playlistSongs)

    return (
      <FlatList
        data={playlistSongs.tracks.items}
        keyExtractor={(item, index) => item.track.id + index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("TrackDetails", { track: item.track })}
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
                  item.track.album && item.track.album.images.length > 0
                    ? { uri: item.track.album.images[0].url }
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
                  {`${item.track.name}`}
                </Text>
                <Text style={{ color: "lightgray", fontSize: 14 }}>
                  <Text>{item.track.popularity}</Text>
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
      {/* Playlist image with overlapping buttons and header */}
      <View style={{ height: 300, position: "relative" }}>
        {/* Replace this section with playlist image */}
        {playlist.images && playlist.images.length > 0 ? (
          <Image
            source={{ uri: playlist.images[0].url }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <LinearGradient
            colors={["#8B78E6", "#3DDC97"]}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="play-circle-outline" size={40} color="white" />
          </LinearGradient>
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
          {/* Use your own navigation.goBack() method */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* Replace Ionicons component with your own back button */}
            <Ionicons
              name="arrow-back-circle-sharp"
              size={46}
              color="#d3d3d3"
            />
          </TouchableOpacity>
        </View>
        {/* Playlist name centered at the bottom */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          {/* Display playlist name */}
          <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>
            Playlist: {playlist.name}
          </Text>
        </View>
      </View>
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

      <ScrollView style={{ flex: 1 }}>
        {/* Rest of the content */}
        <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          {/* Display songs in the playlist */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            >
              Playlist Songs
            </Text>
            {renderPlaylistSongs()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaylistDetailScreen;
