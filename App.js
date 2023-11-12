// App.js
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigation from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
  <NavigationContainer>
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  </NavigationContainer>
  );
}

export default App;
