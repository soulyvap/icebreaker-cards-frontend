import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Card from "../common/Card";
import { getPastelColor } from "../../colors/pastel";
import styled from "styled-components/native";
import Padding from "../common/Padding";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../../di/DIContext";

const data: PillSelectorItemProps[] = [
  {
    value: "Level 1: Perception",
    color: getPastelColor(1),
    selected: false,
    onPress: () => {},
    level: 1,
  },
  {
    value: "Level 2: Connection",
    color: getPastelColor(2),
    selected: false,
    onPress: () => {},
    level: 2,
  },
  {
    value: "Level 3: Reflection",
    color: getPastelColor(3),
    selected: false,
    onPress: () => {},
    level: 3,
  },
  {
    value: "Custom questions",
    color: getPastelColor(0),
    selected: false,
    onPress: () => {},
    level: null,
  },
  {
    value: "Favorite",
    color: "red",
    selected: false,
    onPress: () => {},
    level: null,
  },
];

const PillSelector = observer(() => {
  const { managementViewModel } = useDI();
  const selectedListIndex = managementViewModel.selectedListIndex;
  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Padding
          paddingLeft={index == 0 ? 24 : 4}
          paddingRight={index == data.length - 1 ? 24 : 0}
        >
          <PillSelectorItem
            value={item.value}
            color={item.color}
            selected={selectedListIndex == index}
            onPress={() => managementViewModel.changeSelectedListIndex(index)}
            level={null}
          />
        </Padding>
      )}
      keyExtractor={(item) => item.value}
      style={{ flexGrow: 0 }}
      horizontal
    />
  );
});

interface PillSelectorItemProps {
  value:
    | "Level 1: Perception"
    | "Level 2: Connection"
    | "Level 3: Reflection"
    | "Custom questions"
    | "Favorite";
  color: string;
  selected: boolean;
  onPress: () => void;
  level: number | null;
}

const PillSelectorItem = (props: PillSelectorItemProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        color={props.selected ? props.color : "white"}
        borderColor={props.color}
        borderRadius={100}
        padding={8}
      >
        <PillText
          color={props.selected ? "white" : props.color}
          isBold={props.selected}
        >
          {props.value}
        </PillText>
      </Card>
    </TouchableOpacity>
  );
};

interface PillTextProps {
  color: string;
  isBold: boolean;
}

const PillText = styled.Text`
  color: ${(props: PillTextProps) => props.color};
  font-size: 12px;
  font-weight: ${(props: PillTextProps) => (props.isBold ? "bold" : "normal")};
`;

export default PillSelector;
