import { AuthRepository } from "../repositories/AuthRepository";

export class CheckAuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    return await this.authRepository.checkAuth();
  }
}
