// ArtistDetailsScreen remains the same

// HomeScreen remains the same

// HomeNavigation.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtistDetailsScreen from "../screens/ArtistDetailsScreen"; // Import ArtistDetailsScreen
import TrackDetailScreen from "../screens/TrackDetailScreen"; // Import ArtistDetailsScreen
import PlaylistDetailScreen from "../screens/PlaylistDetailScreen"; // Import ArtistDetailsScreen
import AlbumDetailScreen from "../screens/AlbumDetailScreen"; // Import ArtistDetailsScreen

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Create a stack navigator for artist details

// ArtistDetailsStack component for handling the stack of artist details screen
const ArtistDetailsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for the stack navigator
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />
      <Stack.Screen name="TrackDetails" component={TrackDetailScreen} />
      <Stack.Screen name="PlaylistDetails" component={PlaylistDetailScreen} />
      <Stack.Screen name="AlbumDetails" component={AlbumDetailScreen} />
    </Stack.Navigator>
  );
};

// Main tab navigator
function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        headerShown: false, // Hide headers for all screens in this navigator
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={ArtistDetailsStack} // Render the ArtistDetailsStack here
        options={{
          title: "Home",
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="white" />
            ) : (
              <Ionicons name="home-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search" size={24} color="white" />
            ) : (
              <Ionicons name="search-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" size={24} color="white" />
            ) : (
              <Ionicons name="settings-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigation;
