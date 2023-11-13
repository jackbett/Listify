import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity, RefreshControl, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../api/AuthService";
import Marquee from "react-native-marquee";
import { SpotifyApi } from "../api/SpotifyApi";  // Make sure this path is correct
import { useUserProfile, useCurrentlyPlaying, useTopArtists, useTopTracks, useUserPlaylists } from "../api/SpotifyApi";
import LoadingScreen from "../screens/LoadingScreen";

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const topPadding = screenHeight * 0.08;

  const InitialIcon = ({ initials }) => (
    <Text style={{ color: "white", fontSize: 50 }}>{initials}</Text>
  );

  // Custom hooks should be called directly inside the functional component
  const { userProfile, updateUserProfile } = useUserProfile(accessToken);
  const { currentlyPlaying, updateCurrentlyPlaying } = useCurrentlyPlaying(accessToken);
  const { topArtists, updateTopArtists } = useTopArtists(accessToken);
  const { topTracks, updateTopTracks } = useTopTracks(accessToken);
  const { userPlaylists, updateUserPlaylists } = useUserPlaylists(accessToken);

  const fetchData = async () => {
    try {
      await updateCurrentlyPlaying();
      await updateTopArtists();
      await updateUserProfile();
      await updateTopTracks();
      await updateUserPlaylists();
      setDataLoaded(true); // Set dataLoaded to true when all data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  // Function to handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await updateCurrentlyPlaying();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Loading screen until data is loaded
  if (!dataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={{ padding: 5, paddingTop: topPadding, backgroundColor: "#151515" }}>
        <View style={{ flexDirection: "row", paddingHorizontal: 5, paddingVertical: 10, alignItems: "center" }}>
          <View>
            <TouchableOpacity>
              <Ionicons name={"settings"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#1DB954", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
              A song you like with a color in the title
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
            <View style={{ flex: 1, alignItems: "flex-start", width: "50%", padding: 0 }}>
              <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 24, fontFamily: "AvenirNext-Bold" }}>
                  Hello {userProfile ? userProfile.display_name : ''}!
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium" }}>
                  @{userProfile ? userProfile.id : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1ED760",
                borderRadius: 50,
                overflow: "hidden",
                width: 80,
                height: 80,
              }}>
              {userProfile && userProfile.images && userProfile.images.length > 0 ? (
                <Image
                  source={{ uri: userProfile.images[0].url }}
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                  resizeMode="cover"
                />
              ) : (
                <InitialIcon initials={userProfile?.display_name ? userProfile.display_name[0].toUpperCase() : <Ionicons name="person-outline" size={50} color="white" />} />
              )}
            </View>
          </View>
        </View>

        {/* <View style={{ alignItems: "center", padding: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
            A song you like with a color in the title
          </Text>
        </View> */}
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ flexGrow: 1 }}
        // refreshControl={<RefreshControl tintColor="#FFFFFF" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#FFFFFF" />}
      >
{currentlyPlaying && currentlyPlaying.item ? (
  <View style={{ flexDirection: "row", padding: 10, alignItems: "stretch", paddingRight: 10, }}>
    <View style={{ flex: 1,  }}>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
        Currently Playing
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center,", paddingRight: 10 }}>
        <Image source={{ uri: currentlyPlaying.item.album.images[0].url }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />
        <View style={{ flex: 1, paddingLeft: 10}}>
          {currentlyPlaying.item.name.length > 20 ? (
            <Marquee style={{ color: "white", fontSize: 18, fontFamily: "AvenirNext-Bold", marginBottom: 5 }} speed={0.15} delay={2000}>
              {currentlyPlaying.item.name}
            </Marquee>
          ) : (
            <Text style={{ color: "white", fontSize: 18, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
              {currentlyPlaying.item.name}
            </Text>
          )}
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium", marginBottom: 5 }}>
            {currentlyPlaying.item.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
      </View>
    </View>
    
    
    <View style={{  }}>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
        Popularity
      </Text>
      <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 40, fontFamily: "AvenirNext-UltraLight", paddingTop:10 }}>
        {currentlyPlaying.item.popularity}
      </Text>
        
      </View>
    </View>
    {/* <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "blue", alignSelf: "flex-start" }}>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
        Popularity
      </Text>
      <Text style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium" }}>
        {currentlyPlaying.item.popularity}
      </Text>
    </View> */}
  </View>
) : (
  null
)}







        <View style={{ padding: 10, alignItems: "flex-start", width: "100%" }}>
          <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
            Top Artists
          </Text>
          <FlatList
            horizontal
            data={topArtists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={{ width: 80, alignItems: "center", marginRight: 15 }}>

                <View style={{ width: 80, height: 80, borderRadius: 50, overflow: "hidden", marginBottom: 5 }}>
                  {item.images && item.images.length > 0 ? (
                    <Image
                      source={{ uri: item.images[0].url }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <LinearGradient
                      colors={["#8B78E6", "#3DDC97"]}
                      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons name="person-outline" size={40} color="white" />
                    </LinearGradient>
                  )}
                </View>

                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 12, fontFamily: "AvenirNext-Bold", textAlign: "center" }}>
                  {`${index + 1}. ${item.name}`}
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </View>

        <View style={{ padding: 10, alignItems: "flex-start", width: "100%" }}>
          <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
            Top Tracks
          </Text>
          <FlatList
            horizontal
            data={topTracks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={{ width: 80, alignItems: "center", marginRight: 15 }}>


                <View style={{ width: 80, height: 80, borderRadius: 0, overflow: "hidden", marginBottom: 5 }}>
                  {item.album && item.album.images.length > 0 ? (
                    <Image
                      source={{ uri: item.album.images[0].url }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <LinearGradient
                      colors={["#8B78E6", "#3DDC97"]}
                      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons name="musical-notes-outline" size={40} color="white" />
                    </LinearGradient>
                  )}
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 12, fontFamily: "AvenirNext-Bold", textAlign: "center" }}>
                  {`${index + 1}. ${item.name}`}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 10, fontFamily: "AvenirNext-Medium", textAlign: "center" }}>
                  {item.artists.map(artist => artist.name).join(', ')}
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </View>

        <View style={{ padding: 10, alignItems: "flex-start", width: "100%" }}>
          <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
            Your Playlists
          </Text>
          <FlatList
            horizontal
            data={userPlaylists}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <View key={index} style={{ width: 80, alignItems: "center", marginRight: 15 }}>
                <View style={{ width: 80, height: 80, borderRadius: 0, overflow: "hidden", marginBottom: 5 }}>
                  {item.images && item.images.length > 0 ? (
                    <Image
                      source={{ uri: item.images[0].url }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <LinearGradient
                      colors={["#8B78E6", "#3DDC97"]}
                      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons name="play-circle-outline" size={40} color="white" />
                    </LinearGradient>
                  )}
                </View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 12, fontFamily: "AvenirNext-Bold", textAlign: "center" }}>
                  {`${index + 1}. ${item.name}`}
                </Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 10 }}
          />
        </View>


      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
