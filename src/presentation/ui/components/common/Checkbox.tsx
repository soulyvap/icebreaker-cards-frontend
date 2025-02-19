import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define props for the checkbox component
interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
}

/**
 * A checkbox component.
 */
const Checkbox = (props: CheckboxProps) => {
  return (
    <CheckboxContainer onPress={props.onPress} activeOpacity={0.7}>
      <CheckboxBox checked={props.checked}>
        {props.checked && <Ionicons name="checkmark" size={16} color="white" />}
      </CheckboxBox>
      {props.label && <CheckboxLabel>{props.label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};

// Styled Components with TypeScript Props
const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CheckboxBox = styled.View<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 2px solid #aaa;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? "orange" : "white"};
`;

const CheckboxLabel = styled.Text`
  margin-left: 8px;
  font-size: 14px;
`;

export default Checkbox;
