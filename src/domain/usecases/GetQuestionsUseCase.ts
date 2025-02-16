import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuestionModel } from "../models/QuestionModel";

export class GetQuestionsUseCase {
  private questionRepo: QuestionRepository;
  constructor(questionRepo: QuestionRepository) {
    this.questionRepo = questionRepo;
  }

  async execute(): Promise<QuestionModel[]> {
    return await this.questionRepo.getQuestions();
  }
}