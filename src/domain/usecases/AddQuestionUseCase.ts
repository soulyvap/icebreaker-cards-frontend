import { QuestionModel } from "../models/QuestionModel";
import { QuestionRepository } from "../repositories/QuestionRepository";

export class AddQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(question: QuestionModel): Promise<QuestionModel | null> {
   return await this.questionRepo.addQuestion(question);
  }
}