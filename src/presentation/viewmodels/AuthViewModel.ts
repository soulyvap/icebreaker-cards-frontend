import { makeAutoObservable, runInAction, set } from "mobx";
import { CheckAuthUseCase } from "../../domain/usecases/CheckAuthUseCase";
import { LoginUseCase } from "../../domain/usecases/LoginUseCase";
import { LogoutUseCase } from "../../domain/usecases/LogoutUseCase";
import { RegisterUseCase } from "../../domain/usecases/RegisterUseCase";
import { RefreshAccessTokenUseCase } from "../../domain/usecases/RefreshAccessTokenUseCase";

/**
 * ViewModel for the Auth screen
 */
export class AuthViewModel {
  private checkAuthUseCase: CheckAuthUseCase;
  private loginUseCase: LoginUseCase;
  private logoutUseCase: LogoutUseCase;
  private registerUseCase: RegisterUseCase;
  private refreshAccessTokenUseCase: RefreshAccessTokenUseCase;
  isAuthenticated: boolean | null = null;
  mode: "login" | "register" = "login";
  email: string = "";
  password: string = "";
  showPassword: boolean = false;
  showEmailValidation: boolean = false;
  showPasswordValidation: boolean = false;
  emailError: string | undefined = undefined;
  passwordError: string | undefined = undefined;

  constructor({
    checkAuthUseCase,
    loginUseCase,
    logoutUseCase,
    registerUseCase,
    refreshAccessTokenUseCase,
  }: {
    checkAuthUseCase: CheckAuthUseCase;
    loginUseCase: LoginUseCase;
    logoutUseCase: LogoutUseCase;
    registerUseCase: RegisterUseCase;
    refreshAccessTokenUseCase: RefreshAccessTokenUseCase;
  }) {
    makeAutoObservable(this);
    this.checkAuthUseCase = checkAuthUseCase;
    this.loginUseCase = loginUseCase;
    this.logoutUseCase = logoutUseCase;
    this.registerUseCase = registerUseCase;
    this.refreshAccessTokenUseCase = refreshAccessTokenUseCase;
  }

  async checkAuth() {
    const isAuthenticated = await this.checkAuthUseCase.execute();
    runInAction(() => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  changeMode = (mode: "login" | "register") => {
    runInAction(() => {
      this.resetForm();
      this.mode = mode;
    });
  };

  changeEmail = (text: string) => {
    runInAction(() => {
      this.email = text;
      this.showEmailValidation = false;
      this.emailError = undefined;
    });
  };

  changePassword = (text: string) => {
    runInAction(() => {
      this.password = text;
      this.showPasswordValidation = false;
      this.passwordError = undefined;
    });
  };

  async login() {
    this.validateEmail();
    this.validatePassword();
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    }
    const response = await this.loginUseCase.execute(this.email, this.password);
    if (typeof response == "string") {
      this.showEmailError(response);
      this.showPasswordError(response);
      return;
    }
    runInAction(() => {
      this.isAuthenticated = true;
      this.resetForm();
    });
  }

  async logout() {
    const success = await this.logoutUseCase.execute();
    runInAction(() => {
      this.isAuthenticated = !success;
    });
  }

  async register() {
    this.validateEmail();
    this.validatePassword();
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    }
    const response = await this.registerUseCase.execute(
      this.email,
      this.password
    );
    if (typeof response == "string") {
      this.showEmailError(response);
      this.showPasswordError(response);
      return;
    }
    this.login();
    runInAction(() => {
      this.changeMode("login");
      this.resetForm();
    });
  }

  toggleShowPassword = () => {
    runInAction(() => {
      this.showPassword = !this.showPassword;
    });
  };

  setShowValidation = (value: boolean) => {
    runInAction(() => {
      this.showEmailValidation = value;
    });
  };

  setShowPasswordValidation = (value: boolean) => {
    runInAction(() => {
      this.showPasswordValidation = value;
    });
  };

  validateEmail = () => {
    const emailText = this.email;
    if (emailText.trim() === "") {
      this.showEmailError("Email is required");
      return false;
    }
    const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailText)) {
      this.showEmailError("Invalid email format");
      return false;
    }
    return true;
  };

  validatePassword = () => {
    const passwordText = this.password;
    if (passwordText.trim() === "") {
      this.showPasswordError("Password is required");
      return false;
    }
    if (passwordText.length < 6) {
      this.showPasswordError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  showEmailError = (error: string) => {
    runInAction(() => {
      this.emailError = error;
      this.showEmailValidation = true;
    });
  };

  showPasswordError = (error: string) => {
    runInAction(() => {
      this.passwordError = error;
      this.showPasswordValidation = true;
    });
  };

  refreshAccessToken = async () => {
    try {
      await this.refreshAccessTokenUseCase.execute();
    } catch (err) {
      console.error(err);
    }
  };

  resetForm = () => {
    runInAction(() => {
      this.email = "";
      this.password = "";
      this.showEmailValidation = false;
      this.showPasswordValidation = false;
      this.emailError = undefined;
      this.passwordError = undefined;
    });
  };
}
