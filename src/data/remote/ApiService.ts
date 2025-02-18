import axios from "axios";
import { QuestionModel } from "../../domain/models/QuestionModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { ApiResponse } from "../models/ApiResponse";
import CryptoJS from "crypto-js";
import { 
  LOCAL_IP, API_PORT, API_BASE_PATH
 } from "@env";

const API_BASE_URL = `http://${LOCAL_IP}:${API_PORT}/${API_BASE_PATH}`;

export class ApiService {

  static async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ id: number; email: string }>> {
    try {

      const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
      });

      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      console.error("Error registering user:", error);
      return {
        success: false,
        error: error.response?.data?.error || "An unknown error occurred",
      };
    }
  }

  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    try {

      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      console.error(
        "Error logging in:",
        error.response?.data?.error || "An unknown error occurred"
      );
      return {
        success: false,
        error: error.response?.data?.error || "An unknown error occurred",
      };
    }
  }

  static async refreshAccessToken() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/refresh`, {
        refreshToken,
      });
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken as string;
    } catch (error) {
      console.error(
        "Error refreshing access token. User must log in again:",
        error
      );
      throw error;
    }
  }

  static async logout() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    await axios.post(`${API_BASE_URL}/logout`, { refreshToken });
  }

  /**
   * Checks if an access token is expired.
   * @param token The JWT access token.
   * @returns True if expired, false if still valid.
   */
  private static isTokenExpired(token: string | null): boolean {
    if (!token) return true; // No token means it's expired or invalid

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  private static async checkToken() {
    let token = await AsyncStorage.getItem("accessToken");

    if (!this.isTokenExpired(token)) {
      return token;
    }

    token = await ApiService.refreshAccessToken();
    if (!token) {
      throw new Error("No access token found");
    }

    return token;
  }

  static async getAllQuestions() {
    const token = await this.checkToken();

    try {
      const url = `${API_BASE_URL}/questions`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  static async addQuestion(question: QuestionModel) {
    const token = await this.checkToken();

    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, question, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding question:", error);
      throw error;
    }
  }

  static async updateQuestion(question: QuestionModel) {
    const token = await this.checkToken();

    try {
      const response = await axios.put(
        `${API_BASE_URL}/questions/${question.id}`,
        question,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  }

  static async deleteQuestion(id: number) {
    const token = await this.checkToken();

    try {
      const response = await axios.delete(`${API_BASE_URL}/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }

  static async addFavorite(questionId: number) {
    const token = await this.checkToken();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        { question_id: questionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  }

  static async deleteFavorite(questionId: number) {
    const token = await this.checkToken();

    try {
      const response = await axios.delete(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { question_id: questionId },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting favorite:", error);
      throw error;
    }
  }
}
