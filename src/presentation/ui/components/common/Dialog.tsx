import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

interface DialogProps {
  visible: boolean;
  children: React.ReactNode;
}

const Dialog = (props: DialogProps) => {
  return (
    <Modal transparent visible={props.visible} animationType="fade">
      <Backdrop>
        <DialogBox>{props.children}</DialogBox>
      </Backdrop>
    </Modal>
  );
};

// Styled Components
const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 10px;
  elevation: 5;
  shadow-color: black;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
`;

export default Dialog;
