import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";

interface CenterProps extends ViewProps {
  fullScreen?: boolean; // Whether to take up the full screen
}

const CenterContainer = styled.View<CenterProps>`
  justify-content: center;
  align-items: center;
  flex: ${(props: CenterProps) => (props.fullScreen ? 1 : "auto")};
`;

/**
 * A centering component.
 */
const Center: React.FC<CenterProps> = ({
  fullScreen = false,
  children,
  ...rest
}) => {
  return (
    <CenterContainer fullScreen={fullScreen} {...rest}>
      {children}
    </CenterContainer>
  );
};

export default Center;
