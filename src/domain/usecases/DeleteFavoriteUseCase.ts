import { FavoriteRepository } from "../repositories/FavoriteRespository";

/**
 * Use case to delete a favorite question
 */
export class DeleteFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(favoriteId: number): Promise<void> {
    await this.favoriteRepository.removeFavorite(favoriteId);
  }
}