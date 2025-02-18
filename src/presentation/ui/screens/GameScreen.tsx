import React, { useLayoutEffect, useMemo } from "react";
import Column from "../components/common/Column";
import ProgressIndicator from "../components/game/ProgressIndicator";
import CardCarousel from "../components/game/CardCarousel";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, Text } from "react-native";
import { useDI } from "../../../di/DIContext";
import Padding from "../components/common/Padding";
import { getPastelColor } from "../colors/pastel";
import { observer } from "mobx-react-lite";
import OutlinedButton from "../components/common/OutlinedButton";
import Center from "../components/common/Center";

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, "Game">;

const GameScreen = observer(() => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { gameViewModel } = useDI();
  const nextLevel = gameViewModel.nextLevel;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Padding paddingRight={16}>
          {nextLevel && (
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

  if (gameViewModel.loading) {
    return (
      <Center fullScreen>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

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
