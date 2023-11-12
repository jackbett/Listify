import React, { useContext, useEffect } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SpotifyApi from "../api/SpotifyApi";
import { AuthContext } from "../api/AuthService";
import { useUserProfile, useCurrentlyPlaying } from "../api/SpotifyApi";
import Marquee from "react-native-marquee"; // Import Marquee

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const accessToken = state.accessToken;

  const userProfile = useUserProfile(accessToken);
  const currentlyPlaying = useCurrentlyPlaying(accessToken);

  // console.log(currentlyPlaying)

  // Calculate padding based on screen height
  const screenHeight = Dimensions.get("window").height;
  const topPadding = screenHeight * 0.08;

  const InitialIcon = ({ initials }) => (
      <Text style={{ color: "white", fontSize: 50 }}>{initials}</Text>
  );

  useEffect(() => {
    // Additional logic or side effects can be added here
  }, []);

  return (
    //overall view container
    <View style={{ paddingTop: topPadding, flex: 1, backgroundColor: "#151515",  }}>
      {/* //top view container */}
      <View style={{  padding: 5}} >
        
        {/*Settings view container*/}
        <View style={{  flexDirection: "row", paddingHorizontal: 5, paddingVertical: 10, alignItems: "center" }}>
          {/* First view, the size of the icon */}
          <View>
            <TouchableOpacity>
              <View>
                <Ionicons name={"settings"} size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Second view, goes all the way across */}
          <View style={{ flex: 1 }}>
            {/* Your content for the second view goes here */}
          </View>
        </View>

        {/* Hello and icon Section */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#151515" }}>
          {/* Left section for user display name */}
          <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
            {/* Left section for user display name */}
            <View style={{ flex: 1, alignItems: "flex-start", width: "50%", padding: 0 }}>
              <View>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 24, fontFamily: "AvenirNext-Bold" }}>
                  Hello {userProfile?.display_name}!
                </Text>
                {/* Additional text */}
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium" }}>
                  @{userProfile?.id}
                </Text>
              </View>
            </View>

            {/* Right section for profile image */}
            <View
              style={{
                padding: 0,
                justifyContent: "center",
                alignItems :"center",
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
      

        {/* Additional view in the top section */}
        <View style={{  alignItems: "center", padding: 10, backgroundColor: "#151515" }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
            A song you like with a color in the title
          </Text>
        </View>
      </View>
      
      <View style ={{flex: 1,}}>
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
          {/* Display currently playing track details */}
          {currentlyPlaying && currentlyPlaying.item ? (
            <View style={{ padding: 10, width: "50%" }}>
              {/* Currently Playing Text */}
              <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}>
                Currently Playing
              </Text>

              {/* Nested View for Album Image and Song Details */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Album Image on the left side */}
                <Image source={{ uri: currentlyPlaying.item.album.images[0].url }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />

                {/* Song details on the right side */}
                <View>
                  {/* Song Name with scrolling effect */}
                  <Marquee style={{ color: "white", fontSize: 18, fontFamily: "AvenirNext-Bold", marginBottom: 5 }}
                  speed={.15}
                  delay={2000}
                  >
                  {currentlyPlaying.item.name}
                </Marquee>

                  {/* Artist Name */}
                  <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext", marginBottom: 5 }}>
                    {currentlyPlaying.item.artists.map((artist) => artist.name).join(", ")}
                  </Text>

                  {/* <MarqueeView duration={3000} loop style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium" }}>
                    {currentlyPlaying.item.artists.map((artist) => artist.name).join(", ")}
                  </MarqueeView> */}
                </View>
              </View>
            </View>
          ) : (
            <Text style={{ color: "white" }}>No track is currently playing</Text>
          )}

          {/* Additional content or styles can be added as needed */}
        </LinearGradient>
      </View>
  </View>
  );
};

export default HomeScreen;
