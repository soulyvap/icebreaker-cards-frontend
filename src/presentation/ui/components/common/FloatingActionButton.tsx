import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingButtonProps {
  onPress: () => void;
  color?: string;
}

/**
 * A floating action button component.
 */
const FloatingButton = (props: FloatingButtonProps) => {
  return (
    <FABContainer
      onPress={props.onPress}
      color={props.color}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={24} color="white" />
    </FABContainer>
  );
};

const FABContainer = styled.TouchableOpacity<FloatingButtonProps>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: ${(props: FloatingButtonProps) => props.color || "black"};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
`;

export default FloatingButton;
