import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDI } from "../../di/DIContext";
import Center from "../ui/components/common/Center";
import AuthScreen from "../ui/screens/AuthScreen";
import GameScreen from "../ui/screens/GameScreen";
import ManagementScreen from "../ui/screens/ManagementScreen";
import StartScreen from "../ui/screens/StartScreen";
import WelcomeScreen from "../ui/screens/WelcomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Management" component={ManagementScreen} />
    </Stack.Navigator>
  );
};

const UnauthenticatedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Navigation = observer(() => {
  const { authViewModel } = useDI();
  const isAuthenticated = authViewModel.isAuthenticated;

  useEffect(() => {
    authViewModel.checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Center fullScreen>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Authenticated"
            component={AuthenticatedStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Unauthenticated"
            component={UnauthenticatedStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Navigation;
