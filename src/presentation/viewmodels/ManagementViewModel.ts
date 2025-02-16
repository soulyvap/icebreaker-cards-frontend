import { makeAutoObservable, runInAction, set } from "mobx";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { AddQuestionUseCase } from "../../domain/usecases/AddQuestionUseCase";
import { GetQuestionsUseCase } from "../../domain/usecases/GetQuestionsUseCase";
import { LikeDislikeQuestionUseCase } from "../../domain/usecases/LikeDislikeQuestionUseCase";

export class ManagementViewModel {
  private getQuestionsUseCase: GetQuestionsUseCase;
  private addQuestionUseCase: AddQuestionUseCase;
  private likeDislikeQuestionUseCase: LikeDislikeQuestionUseCase;
  questions: QuestionModel[] = [];
  loading: boolean = false;
  selectedListIndex: number = 0;
  newQuestion: QuestionModel = {
    id: 0,
    text: "",
    level: 1,
    isFavorite: true,
    isWildcard: false,
    isDefault: false
  };
  showDialog: boolean = false;

  constructor({
    getQuestionsUseCase,
    addQuestionUseCase,
    likeDislikeQuestionUseCase,
  }: {
    getQuestionsUseCase: GetQuestionsUseCase;
    addQuestionUseCase: AddQuestionUseCase;
    likeDislikeQuestionUseCase: LikeDislikeQuestionUseCase;
  }) {
    makeAutoObservable(this);
    this.getQuestionsUseCase = getQuestionsUseCase;
    this.addQuestionUseCase = addQuestionUseCase;
    this.likeDislikeQuestionUseCase = likeDislikeQuestionUseCase;
    this.loadQuestions();
  }

  async loadQuestions() {
    this.loading = true;
    try {
      const questions = await this.getQuestionsUseCase.execute();
      questions.sort((a, b) => Number(a.isDefault) - Number(b.isDefault))
      set(this, {
        questions: questions,
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  addQuestion = async () => {
    try {
      await this.addQuestionUseCase.execute(this.newQuestion);
    } catch (err) {
      console.error(err);
    }
  }

  async toggleFavorite(question: QuestionModel, isFavorite: boolean) {
    try {
      this.updateQuestionInState(question, { isFavorite });
      await this.likeDislikeQuestionUseCase.execute(question, isFavorite);
    } catch (err) {
      console.error(err);
    }
  }

  updateQuestionInState(
    question: QuestionModel,
    update: Partial<QuestionModel>
  ) {
    const index = this.questions.findIndex((q) => q.id === question.id);
    const modifiedQuestion = { ...question, ...update };
    const updatedList = [...this.questions];
    updatedList[index] = modifiedQuestion;
    if (index !== -1) {
      runInAction(() => {
        this.questions = updatedList;
      });
    }
  }

  changeSelectedListIndex = (index: number) => {
    set(this, {
      selectedListIndex: index,
    });
  }

  editNewQuestion = (update: Partial<QuestionModel>) => {
    set(this, {
      newQuestion: { ...this.newQuestion, ...update },
    });
  }

  resetNewQuestion = () => {
    set(this, {
      newQuestion: {
        id: 0,
        text: "",
        level: 1,
        isFavorite: true,
        isWildcard: false,
        isDefault: false,
      },
    });
  }

  toggleDialog = () => {
    set(this, {
      showDialog: !this.showDialog,
    });
  }
}
