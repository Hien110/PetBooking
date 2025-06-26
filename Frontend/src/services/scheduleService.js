import axios from "axios";

const API_URL = "http://localhost:3000/api/schedule";

const scheduleService = {
  getAllSchedules: async () => {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  },

  createSchedule: async (scheduleData) => {
    const response = await axios.post(`${API_URL}/create`, {
      userId: scheduleData.userId,
      serviceId: scheduleData.serviceId,
      shopId: scheduleData.shopId,
      time: scheduleData.time,
      note: scheduleData.note,
    });
    return response.data;
  },

  getScheduleById: async (id) => {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  },

  updateSchedule: async (id, scheduleData) => {
    const response = await axios.post(`${API_URL}/update/${id}`, scheduleData);
    return response.data;
  },

  deleteSchedule: async (id) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  },

  getScheduleByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/getByUserId/${userId}`);
    return response.data;
  },

  getScheduleByShopId: async (shopId) => {
    const response = await axios.get(`${API_URL}/getByShopId/${shopId}`);
    return response.data;
  },

  getSchedulesByDate: async (serviceId, date) => {
    const response = await axios.get(`${API_URL}/by-date/${serviceId}`, {
      params: { date },
    });
    return response.data;
  },
};

export default scheduleService;
