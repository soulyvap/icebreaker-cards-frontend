import { QuestionRepository } from "../repositories/QuestionRepository";

export class DeleteQuestionUseCase {
  constructor(private questionRepo: QuestionRepository) {}
  async execute(id: number): Promise<void> {
    await this.questionRepo.deleteQuestion(id);
  }
}
