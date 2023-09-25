import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import AboutScreen from "../screens/AboutScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function LoginNavigation() {
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
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
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
              <Ionicons name="help" size={24} color="white" />
            ) : (
              <Ionicons name="help-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default LoginNavigation;
