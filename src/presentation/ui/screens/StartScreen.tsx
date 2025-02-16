import { View, Text, Button } from "react-native";
import React from "react";
import Column from "../components/common/Column";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useDI } from "../../../di/DIContext";

type StartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Start"
>;

const StartScreen = () => {
  const navigation = useNavigation<StartScreenNavigationProp>();
  const { gameViewModel } = useDI();

  return (
    <Column width="100%" height="100%" align="center" justify="center" gap={16}>
      <Button
        title="Start"
        onPress={() => {
          gameViewModel.setCardIndex(0);
          navigation.navigate("Game");
        }}
      />
      <Button
        title="Manage questions"
        onPress={() => {
          navigation.navigate("Management");
        }}
      />
    </Column>
  );
};

export default StartScreen;
