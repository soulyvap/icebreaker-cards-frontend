import React, { createContext, useContext } from "react";
import { QuestionRepositoryImpl } from "../data/repositories/QuestionRepositoryImpl";
import { GameViewModel } from "../presentation/viewmodels/GameViewModel";
import { AddQuestionUseCase } from "../domain/usecases/AddQuestionUseCase";
import { ManagementViewModel } from "../presentation/viewmodels/ManagementViewModel";
import { UpdateQuestionUseCase } from "../domain/usecases/UpdateQuestionUseCase";
import { DeleteQuestionUseCase } from "../domain/usecases/DeleteQuestionUseCase";
import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { RegisterUseCase } from "../domain/usecases/RegisterUseCase";
import { CheckAuthUseCase } from "../domain/usecases/CheckAuthUseCase";
import { LoginUseCase } from "../domain/usecases/LoginUseCase";
import { LogoutUseCase } from "../domain/usecases/LogoutUseCase";
import { RefreshAccessTokenUseCase } from "../domain/usecases/RefreshAccessTokenUseCase";
import { AuthViewModel } from "../presentation/viewmodels/AuthViewModel";
import { GetAllQuestionsUseCase } from "../domain/usecases/GetAllQuestionsUseCase";
import { FavoriteRepositoryImpl } from "../data/repositories/FavoriteRepository";
import { AddFavoriteUseCase } from "../domain/usecases/AddFavoriteUseCase";
import { DeleteFavoriteUseCase } from "../domain/usecases/DeleteFavoriteUseCase";

// Define DI Context Type
interface DIContextType {
  gameViewModel: GameViewModel;
  managementViewModel: ManagementViewModel;
  authViewModel: AuthViewModel;
}

// Instantiate Dependencies

// Repositories
const authRepository = new AuthRepositoryImpl();
const questionRepository = new QuestionRepositoryImpl();
const favoriteRepository = new FavoriteRepositoryImpl();

// Use Cases
const getAllQuestionsUseCase = new GetAllQuestionsUseCase(questionRepository);
const addQuestionUseCase = new AddQuestionUseCase(questionRepository);
const updateQuestionUseCase = new UpdateQuestionUseCase(questionRepository);
const deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository);

const registerUseCase = new RegisterUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);
const checkAuthUseCase = new CheckAuthUseCase(authRepository);
const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(authRepository);

const addFavoriteUseCase = new AddFavoriteUseCase(favoriteRepository);
const deleteFavoriteUseCase = new DeleteFavoriteUseCase(favoriteRepository);

// View Models
const gameViewModel = new GameViewModel({
  getAllQuestionsUseCase,
  addFavoriteUseCase,
  deleteFavoriteUseCase,
});
const managementViewModel = new ManagementViewModel({
  getAllQuestionsUseCase,
  addQuestionUseCase,
  updateQuestionUseCase,
  deleteQuestionUseCase,
  addFavoriteUseCase,
  deleteFavoriteUseCase,
});
const authViewModel = new AuthViewModel({
  checkAuthUseCase,
  loginUseCase,
  logoutUseCase,
  registerUseCase,
  refreshAccessTokenUseCase,
});

// Create DI Context with Proper Typing
const DIContext = createContext<DIContextType | undefined>(undefined);

// Create Provider to Make Dependencies Available Globally
export const DIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DIContext.Provider
      value={{ gameViewModel, managementViewModel, authViewModel }}
    >
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
