// LoginScreen.js
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import SpotifyAuthButton from "../components/SpotifyAuthButton"; // Import the new component
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLoginSuccess = (code) => {
    navigation.navigate('Home'); // 'Home' should be the name of the screen in your AppStack that corresponds to the home page.
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
