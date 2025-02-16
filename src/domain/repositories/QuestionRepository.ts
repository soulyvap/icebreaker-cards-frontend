import { QuestionModel } from "../models/QuestionModel";

export interface QuestionRepository {
  getQuestions(): Promise<QuestionModel[]>;
  addQuestion(question: QuestionModel): Promise<void>;
  updateQuestion(question: QuestionModel): Promise<void>;
  deleteQuestion(id: number): Promise<void>;
}