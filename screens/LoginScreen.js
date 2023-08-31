import { Text, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SpotifyAuthButton from "../components/SpotifyAuthButton";

const LoginScreen = ({ navigation }) => {
  const handleLoginSuccess = () => {
    navigation.navigate("Home");
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
