import { AuthRepository } from "../repositories/AuthRepository";

/**
 * Use case to refresh access token
 */
export class RefreshAccessTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    return await this.authRepository.refreshToken();
  }
}
