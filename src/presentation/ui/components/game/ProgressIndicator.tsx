import React from "react";
import { Pressable, PressableProps } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../../di/DIContext";
import Row from "../common/Row";
import Center from "../common/Center";
import Padding from "../common/Padding";

const ProgressIndicator = observer(() => {
  const { gameViewModel } = useDI();
  const { cardIndex, questions, nextCard, prevCard } = gameViewModel;

  return (
    <Padding padding={16}>
      <Row>
        <ArrowButton onPress={prevCard} disabled={cardIndex === 0}>
          <Icon
            name="arrow-left"
            size={30}
            color={cardIndex === 0 ? "#ccc" : "white"}
          />
        </ArrowButton>

        <ProgressText>
          {cardIndex + 1} / {questions.length}
        </ProgressText>

        <ArrowButton
          onPress={nextCard}
          disabled={cardIndex === questions.length - 1}
        >
          <Icon
            name="arrow-right"
            size={30}
            color={cardIndex === questions.length - 1 ? "#ccc" : "white"}
          />
        </ArrowButton>
      </Row>
    </Padding>
  );
});

// Styled Components

const ProgressText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-horizontal: 15px;
`;

const ArrowButton = styled(Pressable)`
  padding: 10px;
  opacity: ${(props: PressableProps) => (props.disabled ? 0.5 : 1)};
`;

export default ProgressIndicator;
