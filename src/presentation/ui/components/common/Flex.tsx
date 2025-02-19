import { View, Text, ViewProps } from "react-native";
import React from "react";
import styled from "styled-components/native";

interface FlexProps extends ViewProps {
  flex?: number;
}

const FlexContainer = styled.View<FlexProps>`
  flex: ${(props: FlexProps) => props.flex || 1};
`;

/**
 * A flex layout component.
 */
const Flex: React.FC<FlexProps> = ({ flex, children, ...rest }) => {
  return (
    <FlexContainer flex={flex} {...rest}>
      {children}
    </FlexContainer>
  );
};

export default Flex;
