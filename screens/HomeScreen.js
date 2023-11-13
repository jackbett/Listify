import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../api/AuthService";
import Marquee from "react-native-marquee";
import { SpotifyApi } from "../api/SpotifyApi";  // Make sure this path is correct
import { useUserProfile, useCurrentlyPlaying } from "../api/SpotifyApi";



const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;

  // const [userProfile, setUserProfile] = useState(null);
  // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const screenHeight = Dimensions.get("window").height;
  const topPadding = screenHeight * 0.08;

  const InitialIcon = ({ initials }) => (
    <Text style={{ color: "white", fontSize: 50 }}>{initials}</Text>
  );

  // Custom hooks should be called directly inside the functional component
  const { userProfile, updateUserProfile } = useUserProfile(accessToken);
  const { currentlyPlaying, updateCurrentlyPlaying } = useCurrentlyPlaying(accessToken);

  const fetchData = async () => {
    try {
      await updateUserProfile();
      await updateCurrentlyPlaying();
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
      // Fetch updated user profile and currently playing
      await updateUserProfile();
      await updateCurrentlyPlaying();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };


  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={{ padding: 5, paddingTop: topPadding, backgroundColor: "#151515" }}>
        <View style={{ flexDirection: "row", paddingHorizontal: 5, paddingVertical: 10, alignItems: "center" }}>
          <View>
            <TouchableOpacity>
              <Ionicons name={"settings"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
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

        <View style={{ alignItems: "center", padding: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
            A song you like with a color in the title
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl tintColor="#FFFFFF" />}
        //        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#FFFFFF" />}

      >
        {currentlyPlaying && currentlyPlaying.item ? (
          <View style={{ padding: 10, alignItems: "flex-start", width: "75%" }}>
            <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
              Currently Playing
            </Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: currentlyPlaying.item.album.images[0].url }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />
              <View style={{ flex: 1 }}>
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
        ) : (
          <Text style={{ color: "white" }}>No track is currently playing</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
