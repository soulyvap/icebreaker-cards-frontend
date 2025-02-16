import { QuestionRepository } from "../../domain/repositories/QuestionRepository";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { ApiService } from "../remote/ApiService";

export class QuestionRepositoryImpl implements QuestionRepository {

  async getQuestions(): Promise<QuestionModel[]> {
    try {
      const questions = await ApiService.fetchQuestions();
      return questions;
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      return [];
    }
  }
  async addQuestion(question: QuestionModel): Promise<void> {
    try {
      await ApiService.addQuestion(question);
      return;
    } catch (error) {
      console.error("❌ Error adding question:", error);
      return;
    }
  }
  async updateQuestion(question: QuestionModel): Promise<void> {
    try {
      await ApiService.updateQuestion(question);
      return
    } catch (error) {
      console.error("❌ Error updating question:", error);
      return
    }
  }
  deleteQuestion(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}
