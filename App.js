import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import { AuthProvider } from './components/AuthContext'; // Make sure to add this import

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <>
    <PlayerContext>
      <AuthProvider>
        <Navigation />
        <ModalPortal />
      </AuthProvider>
    </PlayerContext>
    </>
  );
}
