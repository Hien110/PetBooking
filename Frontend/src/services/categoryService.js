import axios from "axios";

const API_URL = "https://backend-petbooking.onrender.com/api/category";

export const CategoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      if (!response || !response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
};
