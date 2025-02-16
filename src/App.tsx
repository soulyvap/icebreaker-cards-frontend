import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from "./presentation/ui/screens/GameScreen";
import StartScreen from "./presentation/ui/screens/StartScreen";
import React, { useEffect } from "react";
import { DIProvider } from "./di/DIContext";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
import { setupDatabase } from "./data/local/SQLiteHelper";
import { Alert, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import ManagementScreen from "./presentation/ui/screens/ManagementScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DIProvider>
      <ScreenSizeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Management" component={ManagementScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScreenSizeProvider>
    </DIProvider>
  );
}
