import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

function HomeScreen() {
  const { state } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      if (!userProfile) {
        const accessToken = state.accessToken;
        try {
          const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          setUserProfile(data);
          return data;
        } catch (e) {
          console.error(e);
        }
      }
    };

    getProfile();
  }, []);

  return (
    <LinearGradient
      colors={["#040306", "#131624"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ color: "white" }}>Hello, {userProfile?.display_name}</Text>
    </LinearGradient>
  );
}

export default HomeScreen;
