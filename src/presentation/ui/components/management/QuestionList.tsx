import { FlatList, Text } from "react-native";
import React from "react";
import { QuestionModel } from "../../../../domain/models/QuestionModel";
import Padding from "../common/Padding";
import QuestionListTile from "./QuestionListTile";
import { useDI } from "../../../../di/DIContext";
import Flex from "../common/Flex";

interface QuestionListProps {
  questions: QuestionModel[];
}

const QuestionList = (props: QuestionListProps) => {
  const { managementViewModel } = useDI();
  return (
    <Flex>
      {props.questions.length === 0 && (
        <Padding padding={16}>
          <Text>Start adding your own custom questions!</Text>
        </Padding>
      )}
      <FlatList
        data={props.questions}
        renderItem={({ item }) => (
          <Padding paddingHorizontal={16} paddingVertical={4}>
            <QuestionListTile
              question={item}
              toggleFavorite={(isFavorite) => {
                managementViewModel.toggleFavorite(item, isFavorite);
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
