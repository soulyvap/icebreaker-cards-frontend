import { AuthRepository } from "../repositories/AuthRepository";

export class RefreshAccessTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    return await this.authRepository.refreshToken();
  }
}
