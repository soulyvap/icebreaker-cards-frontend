import React from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface ColumnProps extends ViewProps {
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: number;
  width?: string;
  height?: string;
  color?: string;
}

const ColumnContainer = styled.View<ColumnProps>`
  flex-direction: column;
  align-items: ${(props: ColumnProps) => props.align || "flex-start"};
  justify-content: ${(props: ColumnProps) => props.justify || "flex-start"};
  gap: ${(props: ColumnProps) => props.gap || 0}px;
  width: ${(props: ColumnProps) => props.width || "auto"};
  height: ${(props: ColumnProps) => props.height || "auto"};
  background-color: ${(props: ColumnProps) => props.color || "transparent"};
`;

const Column: React.FC<ColumnProps> = ({
  align,
  justify,
  gap,
  children,
  ...rest
}) => {
  return (
    <ColumnContainer align={align} justify={justify} gap={gap} {...rest}>
      {children}
    </ColumnContainer>
  );
};

export default Column;
