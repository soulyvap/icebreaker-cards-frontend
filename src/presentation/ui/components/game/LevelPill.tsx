import React from "react";
import Card from "../common/Card";
import { getPastelColor } from "../../colors/pastel";
import styled from "styled-components/native";

interface LevelPillProps {
  level: number;
}

/**
 * A level pill component. Indicates the level question.
 */
const LevelPill = (props: LevelPillProps) => {
  return (
    <Card
      expand={false}
      elevation={0}
      borderRadius={100}
      color={getPastelColor(props.level)}
    >
      <PillText>{`Level ${props.level}`}</PillText>
    </Card>
  );
};

const PillText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export default LevelPill;
