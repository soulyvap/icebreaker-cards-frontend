import { AuthRepository } from "../repositories/AuthRepository";

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    return await this.authRepository.logout();
  }
}
