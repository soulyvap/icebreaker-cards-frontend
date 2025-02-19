import { QuestionRepository } from "../repositories/QuestionRepository";

/**
 * Use case to delete a question
 */
export class DeleteQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}
  async execute(id: number): Promise<void> {
    await this.questionRepo.deleteQuestion(id);
  }
}
