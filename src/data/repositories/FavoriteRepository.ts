import { FavoriteRepository } from "../../domain/repositories/FavoriteRespository";
import { ApiService } from "../remote/ApiService";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  async addFavorite(questionId: number): Promise<boolean> {
    try {
      await ApiService.addFavorite(questionId);
      return true;
    } catch (error) {
      console.error("Error adding favorite:", error);
      return false;
    }
  }

  async removeFavorite(questionId: number): Promise<boolean> {
    try {
      await ApiService.deleteFavorite(questionId);
      return true;
    } catch (error) {
      console.error("Error removing favorite:", error);
      return false;
    }
  }
}