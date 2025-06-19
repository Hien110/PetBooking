import axios from "axios";

const API_URL = "http://localhost:3000/api/product";

export const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },
  getProductsByName: async (name) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { query: name },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching products by name:", error);
      throw error;
    }
  },

  getProductsBySellerId: async (sellerId) => {
    try {
      const response = await axios.get(`${API_URL}/get/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products by seller ID:", error);
      throw error;
    }
  },
  createProduct: async (product) => {
    try {
      const response = await axios.post(`${API_URL}/create`, product);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },
  updateProduct: async (id, product) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, product);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};
