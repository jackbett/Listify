import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigation from "./LoginNavigator";
import HomeNavigation from "./HomeNavigator";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
    </NavigationContainer>
  );
}

export default AppNavigation;
