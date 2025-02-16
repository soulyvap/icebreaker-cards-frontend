import React from "react";
import { observer } from "mobx-react-lite";
import { useDI } from "../../../../di/DIContext";
import QuestionList from "./QuestionList";

const ListSwitcher = observer(() => {
  const { managementViewModel } = useDI();
  const questions = managementViewModel.questions;

  const getQuestions = () => {
    switch (managementViewModel.selectedListIndex) {
      case 0:
        return questions.filter((q) => q.level === 1);
      case 1:
        return questions.filter((q) => q.level === 2);
      case 2:
        return questions.filter((q) => q.level === 3);
      case 3:
        return questions.filter((q) => !q.isDefault);
      case 4:
        return questions.filter((q) => q.isFavorite);
      default:
        return [];
    }
  };

  return <QuestionList questions={getQuestions()} />;
});

export default ListSwitcher;
