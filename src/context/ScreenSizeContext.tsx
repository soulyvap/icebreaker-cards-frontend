import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar, useWindowDimensions, Keyboard } from "react-native";

// Define Type for Screen Size Context
interface ScreenSizeContextType {
  width: number;
  height: number;
  isKeyboardVisible: boolean;
}

// Create Context with Default Values
const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(
  undefined
);

// Provider Component with Keyboard Awareness
export const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useWindowDimensions();
  const [usableHeight, setUsableHeight] = useState(height);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const statusBarHeight = StatusBar.currentHeight || 0;

    // Listen for Keyboard Show and Hide Events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardVisible(true);
        setUsableHeight(height - statusBarHeight - event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setUsableHeight(height - statusBarHeight);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [height]);

  return (
    <ScreenSizeContext.Provider
      value={{ width, height: usableHeight, isKeyboardVisible }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};

// Custom Hook for Accessing Screen Size
export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
