import { makeAutoObservable, runInAction, set } from "mobx";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { GetQuestionsUseCase } from "../../domain/usecases/GetQuestionsUseCase";
import { shuffleArray } from "../../core/functions";
import { LikeDislikeQuestionUseCase } from "../../domain/usecases/LikeDislikeQuestionUseCase";

export class GameViewModel {
  private getQuestionsUseCase: GetQuestionsUseCase;
  private likeDislikeQuestionUseCase: LikeDislikeQuestionUseCase;
  questions: QuestionModel[] = [];
  loading: boolean = false;
  cardIndex: number = 0;
  currentLevel: number = 1;

  constructor({
    getQuestionsUseCase,
    likeDislikeQuestionUseCase,
  }: {
    getQuestionsUseCase: GetQuestionsUseCase;
    likeDislikeQuestionUseCase: LikeDislikeQuestionUseCase;
  }) {
    makeAutoObservable(this);
    this.getQuestionsUseCase = getQuestionsUseCase;
    this.likeDislikeQuestionUseCase = likeDislikeQuestionUseCase;
    this.loadQuestions();
  }

  async loadQuestions() {
    this.loading = true;

    try {
      const fetchedQuestions = await this.getQuestionsUseCase.execute();
      const levelOneQuestions = fetchedQuestions.filter(
        (question) => question.level === 1
      );
      const levelTwoQuestions = fetchedQuestions.filter(
        (question) => question.level === 2
      );
      const levelThreeQuestions = fetchedQuestions.filter(
        (question) => question.level === 3
      );
      const randomizedQuestions = [
        ...shuffleArray(levelOneQuestions),
        ...shuffleArray(levelTwoQuestions),
        ...shuffleArray(levelThreeQuestions),
      ];
      runInAction(() => {
        this.questions = randomizedQuestions;
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  setCardIndex = (index: number) => {
    const question = this.questions[index];
    runInAction(() => {
      this.cardIndex = index;
      if (question.level !== this.currentLevel) {
        this.currentLevel = question.level;
      }
    });
  };

  nextCard = () => {
    if (this.cardIndex < this.questions.length - 1) {
      this.setCardIndex(this.cardIndex + 1);
    }
  };

  prevCard = () => {
    if (this.cardIndex > 0) {
      this.setCardIndex(this.cardIndex - 1);
    }
  };

  toNextLevel = () => {
    if (this.currentLevel == 3) {
      return;
    }
    const nextLevel = this.currentLevel + 1;
    const firstQuestionOfNextLevel = this.questions.findIndex(
      (question) => question.level === nextLevel
    );
    this.setCardIndex(firstQuestionOfNextLevel);
  };

  updateQuestion = (index: number, update: Partial<QuestionModel>) => {
    const question = this.questions[index];
    const updatedQuestion = { ...question, ...update };
    set(this.questions, index, updatedQuestion);
  };

  toggleFavorite = (isFavorite: boolean) => {
    const question = this.questions[this.cardIndex];
    this.likeDislikeQuestionUseCase.execute(
      question,
      question.isFavorite ? false : true
    );
    this.updateQuestion(this.cardIndex, { isFavorite });
  };
}
