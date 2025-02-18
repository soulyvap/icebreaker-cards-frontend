import React from "react";
import Card from "../common/Card";
import Row from "../common/Row";
import { QuestionModel } from "../../../../domain/models/QuestionModel";
import FavoriteButton from "../common/FavoriteButton";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface QuestionListTileProps {
  question: QuestionModel;
  toggleFavorite: (isFavorite: boolean) => void;
  onPress?: () => void;
}

const QuestionListTile = (props: QuestionListTileProps) => {
  const questionText = props.question.text;
  const isWildcard = props.question.is_wildcard;
  const textToDisplay = !isWildcard
    ? questionText
    : questionText.includes("WILDCARD: ")
      ? questionText
      : "WILDCARD: " + questionText;

  const isDefault = props.question.is_default;
  const color = isDefault ? "#DDD" : "#FFF";

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.question.is_default}
    >
      <Card color={color}>
        <Row justify="space-between">
          <QuestionText>{textToDisplay}</QuestionText>
          <FavoriteButton
            isFavorite={props.question.is_favorite}
            onToggle={props.toggleFavorite}
          />
        </Row>
      </Card>
    </TouchableOpacity>
  );
};

const QuestionText = styled.Text`
  width: 85%;
`;

export default QuestionListTile;
