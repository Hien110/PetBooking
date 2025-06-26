import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import ScheduleService from "@/services/scheduleService";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export default function BookingForm({ service }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    if (date && service?._id) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      ScheduleService.getSchedulesByDate(service._id, formattedDate)
        .then((schedules) => {
          const times = schedules.map((schedule) =>
            dayjs(schedule.time).tz("Asia/Ho_Chi_Minh").format("HH:mm")
          );
          setBookedTimes(times);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy lịch đặt:", error);
        });
    }
  }, [date, service]);

  const handleBooking = () => {
    if (!date || !time) {
      alert("Vui lòng chọn ngày và giờ đặt lịch.");
      return;
    }

    if (bookedTimes.includes(time)) {
      alert("Khung giờ này đã có người đặt. Vui lòng chọn giờ khác.");
      return;
    }

    const bookingData = {
      userId: user._id,
      serviceId: service._id,
      shopId: service.userId,
      time: new Date(`${date}T${time}:00`),
      note,
    };

    // Gửi dữ liệu đặt lịch đến API
    ScheduleService.createSchedule(bookingData)
      .then((response) => {
        console.log("Đặt lịch thành công:", response);
        window.location.href = `/booking-service-success/${response._id}`;
      })
      .catch((error) => {
        console.error("Lỗi khi đặt lịch:", error);
        alert("Đặt lịch không thành công. Vui lòng thử lại sau.");
      });
    console.log("Dữ liệu đặt lịch:", bookingData);
    // TODO: Gửi API đặt lịch tại đây
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#2e328a] mb-4">
        Đặt lịch dịch vụ: {service?.serviceName}
      </h2>
      {bookedTimes.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Các giờ đã được đặt:
          </p>
          <div className="flex flex-wrap gap-2">
            {bookedTimes.map((t, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Chọn ngày
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ring-[#E35E25]"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Chọn giờ
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              bookedTimes.includes(time)
                ? "ring-red-500 bg-red-100"
                : "ring-[#E35E25]"
            }`}
          />
          {bookedTimes.includes(time) && (
            <p className="text-sm text-red-500 mt-1">
              Giờ này đã được đặt, vui lòng chọn giờ khác.
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1 font-medium">
          Ghi chú (tuỳ chọn)
        </label>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nhập ghi chú nếu có..."
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
        />
      </div>

      <Button
        onClick={handleBooking}
        sx={{
          backgroundColor: "#E35E25",
          color: "white",
          borderRadius: "9999px",
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          textTransform: "none",
          "&:hover": { backgroundColor: "#c4662a" },
        }}
      >
        Xác nhận đặt lịch
      </Button>
    </div>
  );
}
