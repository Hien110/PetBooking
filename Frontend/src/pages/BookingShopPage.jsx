import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/shopSideBar";
import SubHeader from "@/components/SubHeader";
import scheduleService from "@/services/scheduleService"; // cần có file này

const BookingShopPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "shop") {
      navigate("/");
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await scheduleService.getScheduleByShopId(user._id);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [navigate]);
  const handleUpdateStatus = async (id, status) => {
    try {
      await scheduleService.updateStatusSchedule(id, status);
      // Cập nhật lại danh sách
      setBookings((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
    } catch (error) {
      console.error("Cập nhật trạng thái thất bại:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 flex flex-col space-y-6">
          <SubHeader
            title="Lịch đặt dịch vụ"
            subTitle="Quản lý các lượt đặt lịch của cửa hàng"
          />

          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <table className="w-full border border-[#FF6B3C] border-collapse text-left text-[10px] font-normal text-[#4B4B4B]">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Khách hàng
                  </th>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Dịch vụ
                  </th>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Thời gian
                  </th>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Ngày
                  </th>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Trạng thái
                  </th>
                  <th className="border px-2 py-1 text-[#2B6CB0] font-semibold text-[14px]">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, i) => {
                  const localDate = new Date(booking.time);
                  const timeVN = localDate.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const dateVN = localDate.toLocaleDateString("vi-VN");

                  return (
                    <tr key={i}>
                      <td className="border px-2 py-1 text-[14px]">
                        {booking.userId?.name || "Ẩn danh"}
                      </td>
                      <td className="border px-2 py-1 text-[14px]">
                        {booking.serviceId?.serviceName ||
                          "Dịch vụ không xác định"}
                      </td>
                      <td className="border px-2 py-1 text-[14px]">{timeVN}</td>{" "}
                      {/* Giờ */}
                      <td className="border px-2 py-1 text-[14px]">
                        {dateVN}
                      </td>{" "}
                      {/* Ngày */}
                      <td className="border px-2 py-1 text-[14px]">
                        {booking.status || "Chờ xác nhận"}
                      </td>
                      <td className="border px-2 py-1 text-[14px]">
                        {booking.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white text-[13px] px-3 py-1 rounded"
                              onClick={() =>
                                handleUpdateStatus(booking._id, "confirmed")
                              }
                            >
                              Xác nhận
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white text-[13px] px-3 py-1 rounded"
                              onClick={() =>
                                handleUpdateStatus(booking._id, "cancelled")
                              }
                            >
                              Từ chối
                            </button>
                          </div>
                        ) : (
                          <span className="italic text-gray-500">Đã xử lý</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <p className="text-center text-[14px] mt-4">
                Chưa có lịch đặt nào.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingShopPage;
