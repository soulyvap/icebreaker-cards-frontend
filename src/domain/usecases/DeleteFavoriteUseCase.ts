import { FavoriteRepository } from "../repositories/FavoriteRespository";

export class DeleteFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(favoriteId: number): Promise<void> {
    await this.favoriteRepository.removeFavorite(favoriteId);
  }
}