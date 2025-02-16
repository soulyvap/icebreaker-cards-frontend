import React, { createContext, useContext } from "react";
import { QuestionRepositoryImpl } from "../data/repositories/QuestionRepositoryImpl";
import { GetQuestionsUseCase } from "../domain/usecases/GetQuestionsUseCase";
import { GameViewModel } from "../presentation/viewmodels/GameViewModel";
import { ApiService } from "../data/remote/ApiService";
import { AddQuestionUseCase } from "../domain/usecases/AddQuestionUseCase";
import { LikeDislikeQuestionUseCase } from "../domain/usecases/LikeDislikeQuestionUseCase";
import { ManagementViewModel } from "../presentation/viewmodels/ManagementViewModel";

// Define DI Context Type
interface DIContextType {
  gameViewModel: GameViewModel;
  managementViewModel: ManagementViewModel;
}

// Instantiate Dependencies
const questionRepository = new QuestionRepositoryImpl();
const getQuestionsUseCase = new GetQuestionsUseCase(questionRepository);
const addQuestionUseCase = new AddQuestionUseCase(questionRepository);
const likeDislikeQuestionUseCase = new LikeDislikeQuestionUseCase(
  questionRepository
);
const gameViewModel = new GameViewModel({
  getQuestionsUseCase,
  likeDislikeQuestionUseCase,
});
const managementViewModel = new ManagementViewModel({
  getQuestionsUseCase,
  addQuestionUseCase,
  likeDislikeQuestionUseCase,
});

// Create DI Context with Proper Typing
const DIContext = createContext<DIContextType | undefined>(undefined);

// Create Provider to Make Dependencies Available Globally
export const DIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DIContext.Provider value={{ gameViewModel, managementViewModel }}>
      {children}
    </DIContext.Provider>
  );
};

// Custom Hook to Access Dependencies with Error Handling
export const useDI = (): DIContextType => {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error("useDI must be used within a DIProvider");
  }
  return context;
};
