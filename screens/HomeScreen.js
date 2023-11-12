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

  return (
    <View style={{ flex: 1, paddingTop: topPadding, backgroundColor: "#151515"}}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, height: "15%", backgroundColor: "#151515" }}>
        <View>
          <Text style={{ color: "white", fontSize: 24, fontFamily: "AvenirNext-Bold" }}>
            Hello, {userProfile?.display_name}
          </Text>
          {/* Additional text */}
          <Text style={{ color: "white", fontSize: 16, fontFamily: "AvenirNext-Medium" }}>
            @{userProfile?.id}
          </Text>
        </View>
        {userProfile && userProfile.images && userProfile.images.length > 0 ? (
          <Image
            source={{ uri: userProfile.images[0].url }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        ) : (
          <View style={{ backgroundColor: "grey", borderRadius: 50, padding: 10}}>
            <Ionicons name="person-outline" size={50} color="black" />
          </View>
        )}
      </View>

      {/* Additional view in the top section */}
      <View style={{ alignItems: "center", padding: 10, backgroundColor: "#151515" }}>
        <Text style={{ color: "white", fontSize: 20, fontFamily: "AvenirNext-Bold" }}>
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
