import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function AboutScreen() {
  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ color: "white" }}>About</Text>
    </LinearGradient>
  );
}

export default AboutScreen;
