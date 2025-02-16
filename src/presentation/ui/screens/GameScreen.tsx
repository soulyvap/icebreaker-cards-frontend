import React, { useEffect, useLayoutEffect } from "react";
import Column from "../components/common/Column";
import ProgressIndicator from "../components/game/ProgressIndicator";
import CardCarousel from "../components/game/CardCarousel";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Text } from "react-native";
import { useDI } from "../../../di/DIContext";
import Padding from "../components/common/Padding";
import { getPastelColor } from "../colors/pastel";
import { observer } from "mobx-react-lite";
import styled from "styled-components/native";
import OutlinedButton from "../components/common/OutlinedButton";

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

const GameScreen = observer(() => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { gameViewModel } = useDI();
  const nextLevel = gameViewModel.currentLevel + 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Padding paddingRight={16}>
          {gameViewModel.currentLevel < 3 && (
            <OutlinedButton
              title={`To level ${nextLevel}`}
              onPress={() => {
                gameViewModel.toNextLevel();
              }}
              color={getPastelColor(nextLevel)}
              borderColor={getPastelColor(nextLevel)}
            />
          )}
        </Padding>
      ),
    });
  }, [nextLevel]);

  useEffect(() => {
    // gameViewModel.loadQuestions();
  }, []);

  return (
    <Column
      align="center"
      justify="space-between"
      height="100%"
      color={getPastelColor(gameViewModel.currentLevel)}
    >
      <CardCarousel />
      <ProgressIndicator />
    </Column>
  );
});

export default GameScreen;
