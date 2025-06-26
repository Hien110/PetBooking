import axios from "axios";

const API_URL = "http://localhost:3000/api/service";

export const ServiceService = {
  getAllServices: async () => {
    try {
      const res = await axios.get(`${API_URL}/getAllServices`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Lấy dịch vụ thất bại");
    }
  },

  getAllServicePrice: async () => {
    try {
      const res = await axios.get(`${API_URL}/getServicePrice`);
      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Lấy giá dịch vụ thất bại"
      );
    }
  },
  getServiceById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Lấy dịch vụ thất bại");
    }
  },
  createService: async (service) => {
    try {
      const res = await axios.post(`${API_URL}/createService`, service);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Tạo dịch vụ thất bại");
    }
  },
  deleteService: async (serviceId) => {
    try {
      const res = await axios.delete(`${API_URL}/${serviceId}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Xoá dịch vụ thất bại");
    }
  },
  updateService: async (serviceId, service) => {
    try {
      const res = await axios.put(
        `${API_URL}/updateService/${serviceId}`,
        service
      );
      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Cập nhật dịch vụ thất bại"
      );
    }
  },

  getServiceByUserId: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/getServiceByUserId/${userId}`);
      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Lấy dịch vụ theo người dùng thất bại"
      );
    }
  },
};
