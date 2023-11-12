import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, Dimensions, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SpotifyApi from "../api/SpotifyApi"; // Update the path accordingly
import { AuthContext } from "../api/AuthService"; // Add this import

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const { userProfile } = SpotifyApi({ accessToken: state.accessToken });

  // Calculate padding based on screen height
  const screenHeight = Dimensions.get('window').height;
  const topPadding = screenHeight * 0.08;

  const InitialIcon = ({ initials }) => {
    return (
      <View
        style={{
        }}>
        <Text style={{ color: 'white', fontSize: 50 }}>{initials}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: topPadding, backgroundColor: "#151515" }}>
      {/* Settings icon */}
      <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
        {/* First view, the size of the icon */}
        <View>
          <TouchableWithoutFeedback >
            <View>
              <Ionicons name={"settings"} size={24} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Second view, goes all the way across */}
        <View style={{ flex: 1 }}>
          {/* Your content for the second view goes here */}
        </View>
      </View>

      {/* Top section */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 0, height: "12.5%", backgroundColor: "#151515" }}>
      {/* Left section for user display name */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        {/* Left section for user display name */}
        <View style={{ flex: 1, alignItems: 'flex-start', maxWidth: '80%', padding: 5 }}>
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
        <View style={{  backgroundColor: "#1ED760",  borderRadius: 50, 
        alignItems: 'center', justifyContent: 'center', overflow: "hidden", width: 75,
        height: 75,
      }}>
          {userProfile && userProfile.images && userProfile.images.length > 0 ? (
            <Image
              source={{ uri: userProfile.images[0].url }}
              style={{ width: '100%', height: '100%', borderRadius: 50 }}
              resizeMode="cover"
              />
          ) : (           
            <InitialIcon initials={userProfile?.display_name ? userProfile.display_name[0].toUpperCase() 
              : <Ionicons name="person-outline" size={50} color="white" />} />
          )}
        </View>
      </View>
    </View>

      {/* Additional view in the top section */}
      <View style={{ alignItems: "center", padding: 10, backgroundColor: "#151515" }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
          A song you like with a color in the title
        </Text>
      </View>

      <LinearGradient
        colors={["#040306", "#131624"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white" }}>Hello, {userProfile?.id}</Text>

        <Text style={{ color: "white" }}>Hello, {userProfile?.display_name}</Text>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
