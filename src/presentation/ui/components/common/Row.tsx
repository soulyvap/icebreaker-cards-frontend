import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";

interface RowProps extends ViewProps {
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: number;
  background?: string;
  width?: string;
  height?: string;
}

const RowContainer = styled.View<RowProps>`
  flex-direction: row;
  align-items: ${(props: RowProps) => props.align || "center"};
  justify-content: ${(props: RowProps) => props.justify || "flex-start"};
  background-color: ${(props: RowProps) => props.background || "transparent"};
  gap: ${(props: RowProps) => props.gap || 0}px;
  width: ${(props: RowProps) => props.width || "auto"};
  height: ${(props: RowProps) => props.height || "auto"};
`;

/**
 * A row layout component.
 */
const Row: React.FC<RowProps> = ({
  align,
  justify,
  gap,
  background,
  children,
  ...rest
}) => {
  return (
    <RowContainer
      align={align}
      justify={justify}
      gap={gap}
      background={background}
      {...rest}
    >
      {children}
    </RowContainer>
  );
};

export default Row;
