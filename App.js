import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigation from "./navigation/AppNavigator";

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
