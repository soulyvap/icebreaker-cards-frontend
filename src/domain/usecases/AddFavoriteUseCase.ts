import { FavoriteRepository } from "../repositories/FavoriteRespository";

/**
 * Use case to add a question to the favorite list
 */
export class AddFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(questionId: number): Promise<boolean> {
    return await this.favoriteRepository.addFavorite(questionId);
  }
}