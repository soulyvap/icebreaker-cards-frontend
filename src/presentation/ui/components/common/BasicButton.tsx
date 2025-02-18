import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface BasicButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
}

const Button = styled(TouchableOpacity)<{ borderColor?: string }>`
  padding: 10px 16px;
  border-width: 2px;
  background-color: ${(props: BasicButtonProps) =>
    props.backgroundColor || "black"};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ color?: string; fontSize?: number }>`
  color: ${(props: BasicButtonProps) => props.color || "white"};
  font-size: ${(props: BasicButtonProps) =>
    props.fontSize ? `${props.fontSize}px` : "16px"};
  font-weight: bold;
`;

const BasicButton: React.FC<BasicButtonProps> = ({
  title,
  onPress,
  color,
  backgroundColor,
  fontSize,
}) => {
  return (
    <Button onPress={onPress} borderColor={backgroundColor}>
      <ButtonText color={color} fontSize={fontSize}>
        {title}
      </ButtonText>
    </Button>
  );
};

export default BasicButton;
