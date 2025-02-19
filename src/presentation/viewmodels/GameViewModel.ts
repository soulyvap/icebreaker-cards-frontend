import { makeAutoObservable, runInAction, set } from "mobx";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { shuffleArray } from "../../core/functions";
import { GetAllQuestionsUseCase } from "../../domain/usecases/GetAllQuestionsUseCase";
import { AddFavoriteUseCase } from "../../domain/usecases/AddFavoriteUseCase";
import { DeleteFavoriteUseCase } from "../../domain/usecases/DeleteFavoriteUseCase";

/**
 * ViewModel for the game screen
 */
export class GameViewModel {
  private getAllQuestionsUseCase: GetAllQuestionsUseCase;
  private addFavoriteUseCase: AddFavoriteUseCase;
  private deleteFavoriteUseCase: DeleteFavoriteUseCase;

  needsReload: boolean = true;
  questionsLoaded: QuestionModel[] = [];
  questionsDisplayed: QuestionModel[] = [];
  loading: boolean = false;
  cardIndex: number = 0;
  currentLevel: number = 1;
  nextLevel: number | undefined = undefined;

  constructor({
    getAllQuestionsUseCase,
    addFavoriteUseCase,
    deleteFavoriteUseCase,
  }: {
    getAllQuestionsUseCase: GetAllQuestionsUseCase;
    addFavoriteUseCase: AddFavoriteUseCase;
    deleteFavoriteUseCase: DeleteFavoriteUseCase;
  }) {
    makeAutoObservable(this);
    this.getAllQuestionsUseCase = getAllQuestionsUseCase;
    this.addFavoriteUseCase = addFavoriteUseCase;
    this.deleteFavoriteUseCase = deleteFavoriteUseCase;
  }

  loadQuestions = async () => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      const fetchedQuestions = await this.getAllQuestionsUseCase.execute();
      runInAction(() => {
        this.questionsLoaded = fetchedQuestions;
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
    } finally {
      runInAction(() => {
        this.loading = false;
        this.needsReload = false;
      });
    }
  }

  private shuffleQuestions = (questions: QuestionModel[]) => {
    const levelOneQuestions = questions.filter(
      (question) => question.level === 1
    );
    const levelTwoQuestions = questions.filter(
      (question) => question.level === 2
    );
    const levelThreeQuestions = questions.filter(
      (question) => question.level === 3
    );
    const randomizedQuestions = [
      ...shuffleArray(levelOneQuestions),
      ...shuffleArray(levelTwoQuestions),
      ...shuffleArray(levelThreeQuestions),
    ];
    return randomizedQuestions;
  };

  startGame = (onlyFavorites = false) => {
    const questionBase = onlyFavorites
      ? this.questionsLoaded.filter((q) => q.is_favorite)
      : this.questionsLoaded;
    const shuffledQuestions = this.shuffleQuestions(questionBase);
    runInAction(() => {
      this.questionsDisplayed = shuffledQuestions;
      this.currentLevel = shuffledQuestions[0].level;
      this.cardIndex = 0;
      this.nextLevel = this.getNextLevel();
    });
  };

  setCardIndex = (index: number) => {
    const question = this.questionsDisplayed[index];
    runInAction(() => {
      this.cardIndex = index;
      if (question != null && question.level !== this.currentLevel) {
        this.currentLevel = question.level;
        this.nextLevel = this.getNextLevel();
      }
    });
  };

  nextCard = () => {
    if (this.cardIndex < this.questionsDisplayed.length - 1) {
      this.setCardIndex(this.cardIndex + 1);
    }
  };

  prevCard = () => {
    if (this.cardIndex > 0) {
      this.setCardIndex(this.cardIndex - 1);
    }
  };

  toNextLevel = () => {
    if (this.nextLevel == undefined) {
      return;
    }
    const firstQuestionOfNextLevel = this.questionsDisplayed.findIndex(
      (question) => question.level === this.nextLevel
    );
    this.setCardIndex(firstQuestionOfNextLevel);
  };

  getNextLevel = () => {
    const highestLevel =
      this.questionsDisplayed[this.questionsDisplayed.length - 1].level;
    if (this.currentLevel == highestLevel) {
      return undefined;
    }
    return this.questionsDisplayed
      .slice(this.cardIndex)
      .find((q) => q.level > this.currentLevel)?.level;
  };

  updateQuestion = (index: number, update: Partial<QuestionModel>) => {
    const question = this.questionsDisplayed[index];
    const updatedQuestion = { ...question, ...update };
    set(this.questionsDisplayed, index, updatedQuestion);
  };

  toggleFavorite = (isFavorite: boolean) => {
    const question = this.questionsDisplayed[this.cardIndex];
    this.updateQuestion(this.cardIndex, { is_favorite: isFavorite });
    if (isFavorite) {
      this.addFavoriteUseCase.execute(question.id);
    } else {
      this.deleteFavoriteUseCase.execute(question.id);
    }
  };

  clearQuestions = () => {
    runInAction(() => {
      this.questionsLoaded = [];
      this.questionsDisplayed = [];
      this.cardIndex = 0;
      this.currentLevel = 1;
    });
  };

  setNeedsReload = (needsReload: boolean) => {
    runInAction(() => {
      this.needsReload = needsReload;
    });
  }
}
