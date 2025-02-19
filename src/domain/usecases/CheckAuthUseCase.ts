import { AuthRepository } from "../repositories/AuthRepository";

/**
 * Use case to check if the user is authenticated
 */
export class CheckAuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    return await this.authRepository.checkAuth();
  }
}
