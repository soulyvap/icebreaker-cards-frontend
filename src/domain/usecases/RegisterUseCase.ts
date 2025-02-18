import { AuthRepository } from "../repositories/AuthRepository";

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}
  async execute(email: string, password: string): Promise<boolean | string> {
    return await this.authRepository.register(email, password);
  }
}
