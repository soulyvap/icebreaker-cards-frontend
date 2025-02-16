import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

interface OutlinedButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  borderColor?: string;
  fontSize?: number;
}

const Button = styled(TouchableOpacity)<{ borderColor?: string }>`
  padding: 10px 16px;
  border-width: 2px;
  border-color: ${(props: OutlinedButtonProps) =>
    props.borderColor || "#6200ea"};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ color?: string; fontSize?: number }>`
  color: ${(props: OutlinedButtonProps) => props.color || "#6200ea"};
  font-size: ${(props: OutlinedButtonProps) =>
    props.fontSize ? `${props.fontSize}px` : "16px"};
  font-weight: bold;
`;

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  title,
  onPress,
  color,
  borderColor,
  fontSize,
}) => {
  return (
    <Button onPress={onPress} borderColor={borderColor}>
      <ButtonText color={color} fontSize={fontSize}>
        {title}
      </ButtonText>
    </Button>
  );
};

export default OutlinedButton;
