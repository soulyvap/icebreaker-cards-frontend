import { QuestionRepository } from "../../domain/repositories/QuestionRepository";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { ApiService } from "../remote/ApiService";

export class QuestionRepositoryImpl implements QuestionRepository {
  getFavoriteQuestions(): Promise<QuestionModel[]> {
    throw new Error("Method not implemented.");
  }

  async getAllQuestions(): Promise<QuestionModel[]> {
    try {
      const questions = await ApiService.getAllQuestions();
      return questions;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  }

  async addQuestion(question: QuestionModel): Promise<QuestionModel | null> {
    try {
      const response = await ApiService.addQuestion(question);
      return response;
    } catch (error) {
      console.error("Error adding question:", error);
      return null;
    }
  }
  async updateQuestion(question: QuestionModel): Promise<void> {
    try {
      await ApiService.updateQuestion(question);
      return
    } catch (error) {
      console.error("Error updating question:", error);
      return
    }
  }
  async deleteQuestion(id: number): Promise<void> {
    try {
      ApiService.deleteQuestion(id);
      return
    } catch (error) {
      console.error("Error deleting question:", error);
      return
    }
  }
  
}
