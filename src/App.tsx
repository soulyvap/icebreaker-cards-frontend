import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { DIProvider } from "./di/DIContext";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
import Navigation from "./presentation/navigation/Navigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DIProvider>
      <ScreenSizeProvider>
        <Navigation />
      </ScreenSizeProvider>
    </DIProvider>
  );
}
