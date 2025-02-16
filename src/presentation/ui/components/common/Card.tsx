import React from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
  elevation?: number;
  borderRadius?: number;
  width?: string;
  height?: string;
  expand?: boolean;
  padding?: number;
}

const CardContainer = styled.View<CardProps>`
  background-color: ${(props: CardProps) => props.color || "#fff"};
  padding: ${(props: CardProps) => props.padding || 16}px;
  border-radius: ${(props: CardProps) => props.borderRadius || 10}px;
  shadow-color: ${(props: CardProps) =>
    props.elevation && props.elevation > 0 ? "#000" : "transparent"};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: ${(props: CardProps) => props.elevation || 4}px;
  elevation: ${(props: CardProps) => props.elevation || 4};
  height: ${(props: CardProps) => props.height || "auto"};
  width: ${(props: CardProps) => props.width || "auto"};
  flex: ${(props: CardProps) => (props.expand ? 1 : "none")};
  border-color: ${(props: CardProps) => props.borderColor || "transparent"};
  border-width: 1px;
`;

const Card: React.FC<CardProps> = ({
  children,
  elevation,
  borderRadius,
  ...rest
}) => {
  return (
    <CardContainer elevation={elevation} borderRadius={borderRadius} {...rest}>
      {children}
    </CardContainer>
  );
};

export default Card;
