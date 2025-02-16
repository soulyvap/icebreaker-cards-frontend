import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import QuestionListTile from "../components/management/QuestionListTile";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../di/DIContext";
import { FlatList } from "react-native-gesture-handler";
import Padding from "../components/common/Padding";
import Column from "../components/common/Column";
import PillSelector from "../components/management/PillSelector";
import ListSwitcher from "../components/management/ListSwitcher";
import FloatingActionButton from "../components/common/FloatingActionButton";
import { getPastelColor } from "../colors/pastel";
import Dialog from "../components/common/Dialog";
import Card from "../components/common/Card";
import { TextInput } from "react-native";
import Checkbox from "../components/common/Checkbox";
import TogglePill from "../components/common/TogglePill";
import Row from "../components/common/Row";
import { Ionicons } from "@expo/vector-icons";

const ManagementScreen = observer(() => {
  const { managementViewModel } = useDI();
  const newQuestion = managementViewModel.newQuestion;
  return (
    <Padding paddingVertical={16}>
      <Column
        width="100%"
        height="100%"
        align="center"
        justify="center"
        gap={16}
      >
        <PillSelector />
        <ListSwitcher />
      </Column>
      <FloatingActionButton
        color={getPastelColor(managementViewModel.selectedListIndex + 1)}
        onPress={() => {
          const currentLevel =
            managementViewModel.selectedListIndex + 1 < 4
              ? managementViewModel.selectedListIndex + 1
              : 1;
          managementViewModel.editNewQuestion({
            level: currentLevel,
          });
          managementViewModel.toggleDialog();
        }}
      />
      <Dialog visible={managementViewModel.showDialog}>
        <Card>
          <Padding padding={4}>
            <Column width="100%" gap={16}>
              <Row justify="space-between" width="100%">
                <TogglePill
                  index={newQuestion.level - 1}
                  items={[
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
                  ]}
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
              <Padding paddingVertical={60}>
                <TextInput
                  value={managementViewModel.newQuestion.text}
                  placeholder="Enter your new question here"
                  numberOfLines={4}
                  multiline={true}
                  onChangeText={(text) =>
                    managementViewModel.editNewQuestion({ text: text })
                  }
                />
              </Padding>

              <Checkbox
                checked={newQuestion.isWildcard}
                label="Make this a wildcard"
                onPress={() =>
                  managementViewModel.editNewQuestion({
                    isWildcard: !newQuestion.isWildcard,
                  })
                }
              />
              <Row justify="flex-end" width="100%">
                <TouchableOpacity
                  onPress={() => {
                    managementViewModel.addQuestion();
                    managementViewModel.toggleDialog();
                    managementViewModel.resetNewQuestion();
                  }}
                >
                  <Ionicons name="checkmark" size={24} color="black" />
                </TouchableOpacity>
              </Row>
            </Column>
          </Padding>
        </Card>
      </Dialog>
    </Padding>
  );
});

export default ManagementScreen;
