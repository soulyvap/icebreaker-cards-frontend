import { Text, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import Column from "./Column";
import Row from "./Row";
import Icon from "react-native-vector-icons/MaterialIcons";

interface InputProps extends TextInputProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  errorMessage?: string;
  showValidation?: boolean;
}

const InputContainer = styled.View<{ borderColor?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid
    ${(props: { borderColor?: string }) => props.borderColor || "black"};
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
`;

const Input: React.FC<InputProps> = ({
  leading,
  trailing,
  errorMessage,
  showValidation,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const getBorderColor = () => {
    if (errorMessage && showValidation) {
      return "red";
    }
    if (isFocused) {
      return "black";
    }
    return "gray";
  };
  return (
    <Column width="100%">
      <InputContainer borderColor={getBorderColor()}>
        {leading}
        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ flex: 1 }}
        />
        {trailing}
      </InputContainer>
      {errorMessage && (
        <Row gap={4}>
          <Icon name="error" color={"red"} size={16} />
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        </Row>
      )}
    </Column>
  );
};

export default Input;
