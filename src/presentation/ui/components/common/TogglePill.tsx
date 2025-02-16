import { Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "./Card";
import styled from "styled-components/native";

interface TogglePillData {
  value: string;
  color: string;
}

interface TogglePillProps {
  index: number;
  items: TogglePillData[];
  onPress: () => void;
}

const TogglePill = (props: TogglePillProps) => {
  const value = props.items[props.index].value;
  const color = props.items[props.index].color;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card borderRadius={100} padding={8} color={color}>
        <PillText>{value}</PillText>
      </Card>
    </TouchableOpacity>
  );
};

const PillText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export default TogglePill;
