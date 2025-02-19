import { QuestionModel } from "../models/QuestionModel";

export interface QuestionRepository {
  getAllQuestions(): Promise<QuestionModel[]>;
  addQuestion(question: QuestionModel): Promise<QuestionModel | null>;
  updateQuestion(question: QuestionModel): Promise<void>;
  deleteQuestion(id: number): Promise<void>;
}