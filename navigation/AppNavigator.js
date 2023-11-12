import React, { useContext, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import HomeNavigation from "./HomeNavigator";
import LoginNavigation from "./LoginNavigator";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createNativeStackNavigator();

const API_URL = 'https://api.spotify.com/v1/me';
const LOADING_TIMEOUT = 500;

const validateToken = async (accessToken) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Error validating access token:', error);
    return false;
  }
};

const AppNavigation = () => {
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Loading");
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (state.accessToken) {
        const isValid = await validateToken(state.accessToken);

        if (isValid) {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Login");
        }
      } else {
        setInitialRoute("Login");
      }

      setIsTokenValidated(true);
    };

    const timeout = setTimeout(() => {
      checkTokenValidity();
      setLoading(false);
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [state.accessToken]);

  useEffect(() => {
    // Reset the navigation state when the initialRoute changes
    if (isTokenValidated) {
      setInitialRoute("Loading");
    }
  }, [initialRoute, isTokenValidated]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
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
};

export default AppNavigation;
