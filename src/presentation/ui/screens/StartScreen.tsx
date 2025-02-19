import {
  View,
  Text,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Column from "../components/common/Column";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDI } from "../../../di/DIContext";
import { observer } from "mobx-react-lite";
import BasicButton from "../components/common/BasicButton";
import Row from "../components/common/Row";
import OutlinedButton from "../components/common/OutlinedButton";
import Padding from "../components/common/Padding";
import Flex from "../components/common/Flex";
import { RootStackParamList } from "../../navigation/types";

type StartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Start"
>;

/**
 * The main screen for the start of the game.
 * Contains the start button, manage questions button and logout button.
 */
const StartScreen = observer(() => {
  const navigation = useNavigation<StartScreenNavigationProp>();
  const { gameViewModel, managementViewModel, authViewModel } = useDI();
  const loading = gameViewModel.loading;
  const hasFavorite = useMemo(
    () => gameViewModel.questionsLoaded.some((q) => q.is_favorite),
    [gameViewModel.questionsLoaded]
  );

  useFocusEffect(
    useCallback(() => {
      if (gameViewModel.needsReload) {
        gameViewModel.loadQuestions();
      }
    }, [])
  );

  if (loading) {
    return (
      <Column width="100%" height="100%" align="center" justify="center">
        <ActivityIndicator size="large" />
      </Column>
    );
  }

  return (
    <Padding padding={16}>
      <Column height="100%">
        <Row justify="flex-end" width="100%">
          <OutlinedButton
            color="red"
            borderColor="red"
            title="Logout"
            onPress={() => {
              authViewModel.logout().then(() => {
                managementViewModel.clearQuestions();
                gameViewModel.clearQuestions();
              });
            }}
          />
        </Row>
        <Flex />
        <Column width="100%" align="center" justify="center" gap={16}>
          <BasicButton
            title="Start"
            onPress={() => {
              gameViewModel.startGame();
              navigation.navigate("Game");
            }}
          />
          {hasFavorite && (
            <BasicButton
              title="Start with only favorite questions"
              onPress={() => {
                gameViewModel.startGame(true);
                navigation.navigate("Game");
              }}
            />
          )}
          <BasicButton
            title="Manage questions"
            onPress={() => {
              managementViewModel.setDialogMode("add");
              managementViewModel.changeSelectedListIndex(0);
              navigation.navigate("Management");
            }}
          />
        </Column>
        <Flex />
      </Column>
    </Padding>
  );
});

export default StartScreen;
