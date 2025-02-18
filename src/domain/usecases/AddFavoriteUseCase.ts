import { FavoriteRepository } from "../repositories/FavoriteRespository";

export class AddFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(questionId: number): Promise<boolean> {
    return await this.favoriteRepository.addFavorite(questionId);
  }
}