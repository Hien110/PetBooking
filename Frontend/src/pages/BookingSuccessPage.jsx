import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import scheduleService from "@/services/scheduleService";
import { useNavigate } from "react-router-dom";
 function BookingSuccessPage() {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const bookingTime = booking?.time
    ? dayjs(booking.time).tz("Asia/Ho_Chi_Minh").format("HH:mm - DD/MM/YYYY")
    : "Thời gian không xác định";

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingId = window.location.pathname.split("/").pop();
        const bookingData = await scheduleService.getScheduleById(bookingId);
        setBooking(bookingData);
        console.log("Booking Data:", bookingData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đặt lịch:", error);
      }
    };

    fetchBooking();
  }, []);

  return (
    <div className="bg-[#fefbf7] font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-[#2e3a8c] font-extrabold text-3xl text-center leading-tight mb-2">
          ĐẶT LỊCH THÀNH CÔNG
        </h1>
        <p className="text-[#2e3a8c] font-semibold text-lg text-center mb-8">
          Cảm ơn quý khách đã đặt lịch hẹn dịch vụ.
        </p>

        <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-[#2e3a8c]">
            <div className="font-semibold text-base sm:text-lg leading-tight">
              Tên khách hàng
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {booking?.userId?.name || "Không xác định"}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Dịch vụ đã đặt
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {booking?.serviceId?.serviceName || "Không xác định"}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Thời gian hẹn
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {bookingTime}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Ghi chú
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {booking?.note || "Không có ghi chú"}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Số điện thoại
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {booking?.userId?.phone || "Không xác định"}
            </div>
          </div>

          <button
            className="p-2 rounded-xl mt-8 bg-custom-orange flex items-center justify-center w-full text-white hover:bg-[#e35e25] transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessPage;