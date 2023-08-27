import { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { LinearGradient } from "expo-linear-gradient";


function HomeScreen() {
    const { state } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState();

    const getProfile = async () => {
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

    useEffect(() => {
      getProfile();
    });
    
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        <SafeAreaView>
            <Text style={{color: "white"}}>Hello, {userProfile?.display_name}</Text>
        </SafeAreaView>
    </LinearGradient>
  );
}

export default HomeScreen;
