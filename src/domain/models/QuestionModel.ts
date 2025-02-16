/**
 * Question model
 * @interface
 * @property {number} id - Unique identifier
 * @property {string} text - Question text
 * @property {number} level - Difficulty level
 * @property {boolean} isFavorite - Whether the user marked it as a favorite
 * @property {boolean} isWildcard - Special question flag
 * @property {boolean} isSynced - Indicates if the question is synced with remote DB
 * @property {number} lastModified - Timestamp of last modification
 */
export interface QuestionModel {
  id: number;
  text: string;
  level: number;
  isFavorite: boolean;
  isWildcard: boolean;
  isDefault: boolean;
}