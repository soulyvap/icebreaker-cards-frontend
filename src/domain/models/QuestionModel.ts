/**
 * Question model
 * @interface
 * @property {number} id - Unique identifier
 * @property {string} text - Question text
 * @property {number} level - Difficulty level
 * @property {boolean} is_favorite - Whether the user marked it as a favorite
 * @property {boolean} is_wildcard - Special question flag
 * @property {boolean} is_default - Default question flag
 */
export interface QuestionModel {
  id: number;
  text: string;
  level: number;
  is_favorite: boolean;
  is_wildcard: boolean;
  is_default: boolean;
}