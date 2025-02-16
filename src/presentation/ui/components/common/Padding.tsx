import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";

interface PaddingProps extends ViewProps {
  padding?: number; // Single padding value
  paddingHorizontal?: number; // Left & Right padding
  paddingVertical?: number; // Top & Bottom padding
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

const PaddingContainer = styled.View<PaddingProps>`
  padding: ${(props: PaddingProps) =>
    props.padding !== undefined ? `${props.padding}px` : "0px"};
  padding-left: ${(props: PaddingProps) =>
    props.paddingLeft !== undefined ? `${props.paddingLeft}px` : "unset"};
  padding-right: ${(props: PaddingProps) =>
    props.paddingRight !== undefined ? `${props.paddingRight}px` : "unset"};
  padding-top: ${(props: PaddingProps) =>
    props.paddingTop !== undefined ? `${props.paddingTop}px` : "unset"};
  padding-bottom: ${(props: PaddingProps) =>
    props.paddingBottom !== undefined ? `${props.paddingBottom}px` : "unset"};
  padding-horizontal: ${(props: PaddingProps) =>
    props.paddingHorizontal !== undefined
      ? `${props.paddingHorizontal}px`
      : "unset"};
  padding-vertical: ${(props: PaddingProps) =>
    props.paddingVertical !== undefined
      ? `${props.paddingVertical}px`
      : "unset"};
`;

const Padding: React.FC<PaddingProps> = ({ children, ...rest }) => {
  return <PaddingContainer {...rest}>{children}</PaddingContainer>;
};

export default Padding;
