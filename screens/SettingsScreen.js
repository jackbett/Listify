import React, { useContext } from "react";
import { Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../contexts/AuthContext";

function SettingsScreen() {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
      // Additional logic after successful logout, if needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ color: "white" }}>Settings</Text>
      <Pressable
        onPress={handleLogout}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#1DB954",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Log Out</Text>
      </Pressable>
    </LinearGradient>
  );
}

export default SettingsScreen;






