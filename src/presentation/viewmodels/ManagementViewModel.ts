import { makeAutoObservable, runInAction, set } from "mobx";
import { QuestionModel } from "../../domain/models/QuestionModel";
import { AddQuestionUseCase } from "../../domain/usecases/AddQuestionUseCase";
import { UpdateQuestionUseCase } from "../../domain/usecases/UpdateQuestionUseCase";
import { DeleteQuestionUseCase } from "../../domain/usecases/DeleteQuestionUseCase";
import { GetAllQuestionsUseCase } from "../../domain/usecases/GetAllQuestionsUseCase";
import { AddFavoriteUseCase } from "../../domain/usecases/AddFavoriteUseCase";
import { DeleteFavoriteUseCase } from "../../domain/usecases/DeleteFavoriteUseCase";

/**
 * ViewModel for the management screen
 */
const defaultQuestion: QuestionModel = {
  id: 0,
  text: "",
  level: 1,
  is_favorite: true,
  is_wildcard: false,
  is_default: false,
};

export class ManagementViewModel {
  private getAllQuestionsUseCase: GetAllQuestionsUseCase;
  private addQuestionUseCase: AddQuestionUseCase;
  private updateQuestionUseCase: UpdateQuestionUseCase;
  private deleteQuestionUseCase: DeleteQuestionUseCase;
  private addFavoriteUseCase: AddFavoriteUseCase;
  private deleteFavoriteUseCase: DeleteFavoriteUseCase;

  questions: QuestionModel[] = [];
  loading: boolean = false;
  selectedListIndex: number = 0;
  newQuestion: QuestionModel = defaultQuestion;
  input: string = "";
  showDialog: boolean = false;
  dialogMode: "add" | "edit" = "add";

  constructor({
    getAllQuestionsUseCase,
    addQuestionUseCase,
    updateQuestionUseCase,
    deleteQuestionUseCase,
    addFavoriteUseCase,
    deleteFavoriteUseCase,
  }: {
    getAllQuestionsUseCase: GetAllQuestionsUseCase;
    addQuestionUseCase: AddQuestionUseCase;
    updateQuestionUseCase: UpdateQuestionUseCase;
    deleteQuestionUseCase: DeleteQuestionUseCase;
    addFavoriteUseCase: AddFavoriteUseCase;
    deleteFavoriteUseCase: DeleteFavoriteUseCase;
  }) {
    makeAutoObservable(this);
    this.getAllQuestionsUseCase = getAllQuestionsUseCase;
    this.addQuestionUseCase = addQuestionUseCase;
    this.updateQuestionUseCase = updateQuestionUseCase;
    this.deleteQuestionUseCase = deleteQuestionUseCase;
    this.addFavoriteUseCase = addFavoriteUseCase;
    this.deleteFavoriteUseCase = deleteFavoriteUseCase;
  }

  async loadQuestions() {
    this.loading = true;
    try {
      const questions = await this.getAllQuestionsUseCase.execute();
      runInAction(() => {
        this.questions = questions;
        this.questions.sort(
          (a, b) => Number(a.is_default) - Number(b.is_default)
        );
        this.loading = false;
      });
    } catch (err) {
      console.error(err);
    }
  }

  addQuestion = async () => {
    try {
      const added = await this.addQuestionUseCase.execute(this.newQuestion);
      if (added) {
        runInAction(() => {
          this.questions = [...this.questions, added];
          this.questions.sort(
            (a, b) => Number(a.is_default) - Number(b.is_default)
          );
          this.newQuestion = defaultQuestion;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  async toggleFavorite(question: QuestionModel, isFavorite: boolean) {
    try {
      this.updateQuestionInState(question, { is_favorite: isFavorite });
      if (isFavorite) {
        await this.addFavoriteUseCase.execute(question.id);
      } else {
        await this.deleteFavoriteUseCase.execute(question.id);
      }
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
  };

  editNewQuestion = (update: Partial<QuestionModel>) => {
    set(this, {
      newQuestion: { ...this.newQuestion, ...update },
    });
  };

  resetNewQuestion = () => {
    set(this, {
      newQuestion: defaultQuestion,
    });
  };

  toggleDialog = () => {
    set(this, {
      showDialog: !this.showDialog,
    });
  };

  setDialogMode = (mode: "add" | "edit") => {
    set(this, {
      dialogMode: mode,
    });
  };

  async updateQuestion(question: QuestionModel) {
    try {
      await this.updateQuestionUseCase.execute(question);
      this.updateQuestionInState(question, question);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteQuestion(id: number) {
    try {
      runInAction(() => {
        const newList = this.questions.filter((question) => question.id !== id);
        this.questions = newList;
        this.newQuestion = defaultQuestion;
      });
      await this.deleteQuestionUseCase.execute(id);
    } catch (err) {
      console.error(err);
    }
  }

  clearQuestions() {
    runInAction(() => {
      this.questions = [];
    });
  }
}
