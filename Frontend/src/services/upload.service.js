import axios from "axios";

const API_URL = "http://localhost:3000/api/image";

export const UploadService = {
  uploadImage: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response || !response.data) {
        throw new Error("No data received from the server");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
