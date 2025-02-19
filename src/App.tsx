import React from "react";
import { DIProvider } from "./di/DIContext";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
import Navigation from "./presentation/navigation/Navigation";

/**
 * The root component of the application.
 * Contains the DIProvider, ScreenSizeProvider and Navigation.
 */
export default function App() {
  return (
    <DIProvider>
      <ScreenSizeProvider>
        <Navigation />
      </ScreenSizeProvider>
    </DIProvider>
  );
}
