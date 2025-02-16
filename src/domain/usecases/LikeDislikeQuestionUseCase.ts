import { QuestionModel } from "../models/QuestionModel";
import { QuestionRepository } from "../repositories/QuestionRepository";

export class LikeDislikeQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}

  async execute(question: QuestionModel, isLiked: boolean): Promise<void> {
    const modifiedQuestion = { ...question, ...{isFavorite: isLiked} };
    await this.questionRepo.updateQuestion(modifiedQuestion);
  }
}