import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { ApiService } from "../remote/ApiService";

/**
 * The Auth repository implementation
 */
export class AuthRepositoryImpl implements AuthRepository {

  async login(email: string, password: string): Promise<boolean | string> {
    const response = await ApiService.login({
      email: email,
      password: password,
    });
    if (response.success) {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      return true;
    }
    return response.error;
  }

  async register(email: string, password: string): Promise<boolean | string> {
    const response = await ApiService.register({
      email: email,
      password: password,
    });
    if (response.success) {
      return true;
    }
    return response.error;
  }

  async logout(): Promise<boolean> {
    try {
      await ApiService.logout();
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      return false;
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      await ApiService.refreshAccessToken();
      return true;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      return false;
    }
  }

  async checkAuth(): Promise<boolean> {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      return false;
    }

    try {
      await ApiService.refreshAccessToken();
      return true;
    } catch (error) {
      console.error("Error checking auth:", error);
      return false;
    }
  }
}
