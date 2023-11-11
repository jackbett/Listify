// AppNavigation.js

import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import HomeNavigation from "./HomeNavigator";
import LoginNavigation from "./LoginNavigator";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={state.accessToken ? "Home" : "Login"}>
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
