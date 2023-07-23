// LoginScreen.js
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import SpotifyAuthButton from "../components/SpotifyAuthButton"; // Import the new component

const LoginScreen = () => {
  const handleLoginSuccess = (code) => {
    // Handle the code received from Spotify authentication
    // For example, you can call your backend server with this code to exchange it for an access token.
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Create, Collaborate, Enjoy.
        </Text>

        <View style={{ height: 80 }} />
        <SpotifyAuthButton onLoginSuccess={handleLoginSuccess} />

        {/* Rest of the code */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
