import React from "react";
import Card from "../common/Card";
import Row from "../common/Row";
import { QuestionModel } from "../../../../domain/models/QuestionModel";
import FavoriteButton from "../common/FavoriteButton";
import styled from "styled-components/native";

interface QuestionListTileProps {
  question: QuestionModel;
  toggleFavorite: (isFavorite: boolean) => void;
}

const QuestionListTile = (props: QuestionListTileProps) => {
  const questionText = props.question.text;
  const isWildcard = props.question.isWildcard;
  const textToDisplay = !isWildcard
    ? questionText
    : questionText.includes("WILDCARD: ")
      ? questionText
      : "WILDCARD: " + questionText;

  const isDefault = props.question.isDefault;
  const color = isDefault ? "#DDD" : "#FFF";

  return (
    <Card color={color}>
      <Row justify="space-between">
        <QuestionText>{textToDisplay}</QuestionText>
        <FavoriteButton
          isFavorite={props.question.isFavorite}
          onToggle={props.toggleFavorite}
        />
      </Row>
    </Card>
  );
};

const QuestionText = styled.Text`
  width: 85%;
`;

export default QuestionListTile;
