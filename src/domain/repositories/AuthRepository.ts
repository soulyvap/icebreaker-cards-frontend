export interface AuthRepository {
  login: (email: string, password: string) => Promise<boolean | string>;
  register: (email: string, password: string) => Promise<boolean | string>;
  logout: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}