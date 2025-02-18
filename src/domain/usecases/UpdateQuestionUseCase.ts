import { QuestionModel } from "../models/QuestionModel";
import { QuestionRepository } from "../repositories/QuestionRepository";

export class UpdateQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}
  async execute(question: QuestionModel): Promise<void> {
    await this.questionRepo.updateQuestion(question);
  }
}
