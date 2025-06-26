import axios from "axios";

const API_ORDER = "https://backend-petbooking.onrender.com/api/order";

const orderService = {
  updateStatusOrder: async (orderId, status) => {
    try {
      const response = await axios.post(`${API_ORDER}/update-status/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_ORDER}/create`, {
        products: orderData.products,
        userId: orderData.userId,
        totalPrice: orderData.totalPrice,
        address: orderData.address,
        phone: orderData.phone,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`${API_ORDER}/get/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  updateOrder: async (orderId, orderData) => {
    try {
      const response = await axios.put(`${API_ORDER}/update/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const response = await axios.delete(`${API_ORDER}/delete/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },

  getOrderByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_ORDER}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      throw error;
    }
  },

  getOrderBySellerId: async (sellerId) => {
    try {
      const response = await axios.get(`${API_ORDER}/product-seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders by seller ID:", error);
      throw error;
    }
  },
};

export default orderService;
