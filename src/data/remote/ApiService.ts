import axios from "axios";
import { QuestionModel } from "../../domain/models/QuestionModel";

const LOCAL_IP = "192.168.0.101"
const API_PORT = 5001;
const API_BASE_PATH = "api";
const API_BASE_URL = `http://${LOCAL_IP}:${API_PORT}/${API_BASE_PATH}`;

export class ApiService {
  static async fetchQuestions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      throw error;
    }
  }

  static async addQuestion(question: QuestionModel) {
    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, question);
      return response.data;
    } catch (error) {
      console.error("❌ Error adding question:", error);
      throw error;
    }
  }

  static async updateQuestion(question: QuestionModel) {
    try {
      const response = await axios.put(`${API_BASE_URL}/questions/${question.id}`, question);
      return response.data;
    } catch (error) {
      console.error("❌ Error updating question:", error);
      throw error;
    }
  }

  static async deleteQuestion(id: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/questions/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting question:", error);
      throw error;
    }
  }
}