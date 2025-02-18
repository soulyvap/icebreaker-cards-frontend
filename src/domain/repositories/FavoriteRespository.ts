export interface FavoriteRepository {
  addFavorite: (questionId: number) => Promise<boolean>;
  removeFavorite: (questionId: number) => Promise<boolean>;
}