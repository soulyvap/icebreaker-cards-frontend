import { View, Text } from "react-native";
import React, { useState } from "react";
import { QuestionModel } from "../../../../domain/models/QuestionModel";
import Card from "../common/Card";
import Column from "../common/Column";
import Row from "../common/Row";
import Center from "../common/Center";
import Padding from "../common/Padding";
import LevelPill from "./LevelPill";
import FavoriteButton from "../common/FavoriteButton";
import styled from "styled-components/native";

interface QuestionCardProps {
  question: QuestionModel;
  toggleFavorite: (isFavorite: boolean) => void;
}

const QuestionCard = (props: QuestionCardProps) => {
  const [isFavorite, setIsFavorite] = useState(props.question.is_favorite);
  const text = props.question.text.includes("WILDCARD: ")
    ? props.question.text.split("WILDCARD: ")[1]
    : props.question.text;
  return (
    <Padding padding={16}>
      <Card>
        <Column height="100%" align="center" justify="space-between">
          <Row width="100%" justify="space-between">
            <LevelPill level={props.question.level} />
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => {
                const newState = !isFavorite;
                setIsFavorite(newState);
                props.toggleFavorite(newState);
              }}
            />
          </Row>
          <Center>
            <Column align="center" gap={8}>
              {props.question.is_wildcard && (
                <WildcardText>Wildcard</WildcardText>
              )}
              <QuestionText>{text}</QuestionText>
            </Column>
          </Center>
        </Column>
      </Card>
    </Padding>
  );
};

const QuestionText = styled.Text`
  font-size: 20px;
  text-align: center;
  padding: 16px;
`;

const WildcardText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export default QuestionCard;
