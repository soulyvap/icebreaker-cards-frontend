import { QuestionModel } from "../models/QuestionModel";
import { QuestionRepository } from "../repositories/QuestionRepository";

export class GetAllQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute(): Promise<QuestionModel[]> {
    return this.questionRepository.getAllQuestions();
  }
}