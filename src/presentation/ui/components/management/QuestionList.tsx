import { ActivityIndicator, FlatList, Text } from "react-native";
import React from "react";
import { QuestionModel } from "../../../../domain/models/QuestionModel";
import Padding from "../common/Padding";
import QuestionListTile from "./QuestionListTile";
import { useDI } from "../../../../di/DIContext";
import Flex from "../common/Flex";
import Column from "../common/Column";

interface QuestionListProps {
  questions: QuestionModel[];
  listIndex: number;
}

/**
 * A list of questions.
 * Displays a list of questions with the ability to favorite and edit them.
 */
const QuestionList = (props: QuestionListProps) => {
  const { managementViewModel } = useDI();
  const listIndex = props.listIndex;

  const getEmptyListText = (index: number) => {
    switch (index) {
      case 3:
        return "Create your own questions!";
      case 4:
        return "You favorite questions will appear here once added!";
      default:
        return "No questions here!";
    }
  };

  return (
    <Flex>
      {props.questions.length === 0 && (
        <Column align="center" justify="center" height="100%" width="100%">
          <Text>{getEmptyListText(listIndex)}</Text>
        </Column>
      )}
      <FlatList
        data={props.questions}
        renderItem={({ item }) => (
          <Padding key={item.id} paddingHorizontal={16} paddingVertical={4}>
            <QuestionListTile
              question={item}
              toggleFavorite={(isFavorite) => {
                managementViewModel.toggleFavorite(item, isFavorite);
              }}
              onPress={() => {
                managementViewModel.setDialogMode("edit");
                managementViewModel.editNewQuestion(item);
                managementViewModel.toggleDialog();
              }}
            />
          </Padding>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<Padding padding={24} />}
      />
    </Flex>
  );
};

export default QuestionList;
