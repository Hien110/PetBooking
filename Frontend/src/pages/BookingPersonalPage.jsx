import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import scheduleService from "@/services/scheduleService";
import { UserService } from "../services/userService";
import NavbarCustomer from "@/components/NavbarCustomer";
import SubHeader from "@/components/SubHeader";

export default function BookingPersonalPage() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) return;

        const res = await scheduleService.getScheduleByUserId(user._id);
        setBookings(res);
        console.log("Bookings:", res);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách đặt lịch:", err);
      }
    };

    fetchBookings();

    const userId = window.location.pathname.split("/").pop();
        const fetchUser = async () => {
          try {
            const user = await UserService.getUserById(userId);
            setUser(user);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        fetchUser();
  }, []);

  return (
    <div className="bg-[#fefbf7] font-sans min-h-screen ">
        <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1">
          <NavbarCustomer user={user} />
        </div>
        <div className="col-span-3">
          <SubHeader
            title={"Lịch đặt khám thú cưng"}
            subTitle={"Quản lý thông tin lịch đặt khám thú cưng của bạn"}
          />
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có lịch đặt nào.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="space-y-1 text-[#2e3a8c]">
                  <p className="font-semibold text-lg">
                    Dịch vụ:{" "}
                    <span className="font-normal">
                      {booking?.serviceId?.serviceName || "Không xác định"}
                    </span>
                  </p>
                  <p>
                    Cửa hàng:{" "}
                    <span className="font-medium">
                      {booking?.shopId?.name || "Không rõ"}
                    </span>
                  </p>
                  <p>
                    Thời gian:{" "}
                    <span className="font-medium">
                      {dayjs(booking.time)
                        .tz("Asia/Ho_Chi_Minh")
                        .format("HH:mm - DD/MM/YYYY")}
                    </span>
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    <span className="font-medium">
                      {booking?.shopId?.address || "Không có địa chỉ"}
                    </span>
                  </p>
                  <p>
                    Ghi chú:{" "}
                    <span className="text-gray-700">
                      {booking.note || "Không có ghi chú"}
                    </span>
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => alert("Tính năng huỷ chưa triển khai")}
                  >
                    Huỷ lịch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
