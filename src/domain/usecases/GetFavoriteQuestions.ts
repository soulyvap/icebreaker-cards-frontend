import { QuestionRepository } from "../repositories/QuestionRepository";

export class GetFavoriteQuestionsUseCase {
  constructor(private questionRepo: QuestionRepository) {}
  async execute() {
    return await this.questionRepo.getFavoriteQuestions();
  }
}
