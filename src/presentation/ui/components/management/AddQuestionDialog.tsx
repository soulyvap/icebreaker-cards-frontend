import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getPastelColor } from "../../colors/pastel";
import Card from "../common/Card";
import Checkbox from "../common/Checkbox";
import Column from "../common/Column";
import Dialog from "../common/Dialog";
import Padding from "../common/Padding";
import Row from "../common/Row";
import TogglePill from "../common/TogglePill";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../../di/DIContext";
import { Ionicons } from "@expo/vector-icons";
import Flex from "../common/Flex";
import styled from "styled-components/native";

/**
 * The dialog for adding a new question.
 */
const AddQuestionDialog = observer(() => {
  const { managementViewModel } = useDI();
  const newQuestion = managementViewModel.newQuestion;
  const mode = managementViewModel.dialogMode;
  const [error, setError] = useState<string | null>(null);

  const togglePillItems = [
    {
      value: "Level 1: Perception",
      color: getPastelColor(1),
    },
    {
      value: "Level 2: Connection",
      color: getPastelColor(2),
    },
    {
      value: "Level 3: Reflection",
      color: getPastelColor(3),
    },
  ];

  return (
    <Dialog visible={managementViewModel.showDialog}>
      <Card>
        <Padding padding={4}>
          <Column width="100%" gap={32}>
            <Row justify="space-between" width="100%">
              <TogglePill
                index={newQuestion.level - 1}
                items={togglePillItems}
                onPress={() => {
                  const currentLevel = newQuestion.level;
                  const nextLevel = currentLevel === 3 ? 1 : currentLevel + 1;
                  managementViewModel.editNewQuestion({
                    level: nextLevel,
                  });
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  managementViewModel.resetNewQuestion();
                  managementViewModel.toggleDialog();
                }}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </Row>
            <Column gap={4} width="100%">
              <QuestionInput
                value={managementViewModel.newQuestion.text}
                placeholder="Enter your new question here..."
                numberOfLines={4}
                multiline={true}
                borderColor={error ? "red" : undefined}
                onChangeText={(text: string) => {
                  managementViewModel.editNewQuestion({ text: text });
                  if (error) {
                    setError(null);
                  }
                }}
              />
              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </Column>

            <Checkbox
              checked={newQuestion.is_wildcard}
              label="Make this a wildcard"
              onPress={() =>
                managementViewModel.editNewQuestion({
                  is_wildcard: !newQuestion.is_wildcard,
                })
              }
            />
            <Row width="100%">
              {mode === "edit" && (
                <TouchableOpacity
                  onPress={() => {
                    managementViewModel.deleteQuestion(newQuestion.id);
                    managementViewModel.toggleDialog();
                  }}
                >
                  <Ionicons name="trash" size={24} color="black" />
                </TouchableOpacity>
              )}
              <Flex />
              <TouchableOpacity
                onPress={() => {
                  if (newQuestion.text.trim() === "") {
                    setError("Question text cannot be empty");
                    return;
                  }
                  mode === "edit"
                    ? managementViewModel.updateQuestion(newQuestion)
                    : managementViewModel.addQuestion();
                  managementViewModel.toggleDialog();
                }}
              >
                <Ionicons name="checkmark" size={24} color="black" />
              </TouchableOpacity>
            </Row>
          </Column>
        </Padding>
      </Card>
    </Dialog>
  );
});

interface QuestionInputProps {
  borderColor?: string;
}

const QuestionInput = styled.TextInput<QuestionInputProps>`
  border: 1px solid
    ${(props: QuestionInputProps) =>
      props.borderColor ? props.borderColor : "gray"};
  border-radius: 4px;
  width: 100%;
`;

export default AddQuestionDialog;
