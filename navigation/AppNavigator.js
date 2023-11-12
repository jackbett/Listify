import React, { useContext, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import HomeNavigation from "./HomeNavigator";
import LoginNavigation from "./LoginNavigator";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createNativeStackNavigator();
const LOADING_TIMEOUT = 500;

const AppNavigation = () => {
  const { state, validateToken, refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Loading");

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (state.accessToken) {
          console.log('accessTokenExists');
          const isValid = await validateToken();

          if (isValid) {
            console.log('accessTokenValid');
            setInitialRoute("Home");
          } else {
            // Attempt to refresh the token
            console.log('tryingToRefreshToken');
            await refreshToken();
            console.log('tokenRefreshed');
            setInitialRoute("Home");
          }
        } else {
          console.log('noAccessToken');
        }
      } catch (error) {
        console.error('Error checking token validity:', error);
        setInitialRoute("Login");
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      checkTokenValidity();
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [state.accessToken, validateToken, refreshToken]);

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
