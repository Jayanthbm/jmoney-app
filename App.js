//App.js

import * as React from "react";

import { DarkColors, LightColors } from "./constants";
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { Appearance } from "react-native";
import Login from "./screens/Login";
import MainTabs from "./components/MainTabs";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./supabaseClient";

const Stack = createNativeStackNavigator();

export default function App() {
  const [scheme, setScheme] = React.useState(Appearance.getColorScheme());
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Listen for system theme changes
  React.useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  // Check Supabase session
  React.useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);


  if (loading) return null;

  // Merge Paper + Navigation themes with proper dark/light colors

  const CombinedTheme = scheme === "dark"
    ? { ...PaperDarkTheme, colors: { ...PaperDarkTheme.colors, ...DarkColors } }
    : { ...PaperLightTheme, colors: { ...PaperLightTheme.colors, ...LightColors } };


  return (
    <PaperProvider theme={CombinedTheme} settings={{ roundness: 12 }}>
      <NavigationContainer theme={CombinedTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLoginSuccess={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="MainTabs">
                  {(props) => <MainTabs {...props} />}
                </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
