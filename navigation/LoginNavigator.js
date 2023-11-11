// LoginNavigation.js

import React, { useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import AboutScreen from "../screens/AboutScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { AuthContext } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();

function LoginNavigation() {
  const { state } = useContext(AuthContext);
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation prop

  useEffect(() => {
    // Check for the access token on component mount
    if (state.accessToken) {
      // If access token exists, navigate to the home screen
      navigation.navigate("Home");
    }
  }, [state.accessToken, navigation]); // useEffect will run when state.accessToken or navigation changes

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Tab.Screen
        name="LoginTab"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-circle" size={24} color="white" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          title: "About",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="help-circle" size={24} color="white" />
            ) : (
              <Ionicons name="help-circle-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default LoginNavigation;
