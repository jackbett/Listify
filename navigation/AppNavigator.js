// AppNavigation.js

import React, { useContext, useState, useEffect, useRef  } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import HomeNavigation from "./HomeNavigator";
import LoginNavigation from "./LoginNavigator";
import LoadingScreen from "../screens/LoadingScreen"; // Create a LoadingScreen component

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const isUnmounted = useRef(false);

  useEffect(() => {
    // Set the ref to false when the component mounts
    isUnmounted.current = false;

    // If authentication state is loaded, wait for at least 5 seconds and then set loading to false
    const timeout = setTimeout(() => {
      if (!isUnmounted.current) {
        setLoading(false);
      }
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => {
      isUnmounted.current = true;
      clearTimeout(timeout);
    };
  }, [state.accessToken]);

  if (loading) {
    return <LoadingScreen />; // Display a loading screen while authentication state is loading

  }

  return (
  
      <Stack.Navigator
        initialRouteName={state.accessToken ? "Home" : "Login"}
        screenOptions={{
          animationEnabled: false, // Disable animation between screens
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginNavigation}
          options={{
            title: "Listify - Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigation}
          options={{
            title: "Listify - Home",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  
  );
}

export default AppNavigation;
