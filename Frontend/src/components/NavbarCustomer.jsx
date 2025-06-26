import React from "react";
import { Avatar, Button } from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

function NavbarCustomer({ user }) {
  // Check if user is logged in
  return (
    <div className="bg-white rounded-lg shadow-md p-6 select-none h-full">
      {/* Avatar */}
      <div className="flex justify-center mb-3">
        <Avatar
          alt={user ? user.name : "User Avatar"}
          src={user ? user.avatar : "https://via.placeholder.com/96"}
          sx={{ width: 96, height: 96 }}
        />
      </div>

      {/* Tên người dùng */}
      <p className="text-center text-[20px] text-black mb-3 font-semibold">{user ? user.name : "Người dùng mới"}</p>



      {/* Danh sách menu */}
      <ul className="space-y-3 text-xs text-black ml-14 mt-8">
        <li className="flex items-center space-x-2">
          <NotificationsIcon sx={{ color: "#d95a1a", fontSize: "24px" }} />
          <span className="text-[14px] mt-2 font-semibold ml-1">Thông báo</span>
        </li>

        <li className="flex items-start space-x-2">
          <PersonIcon sx={{ color: "#d95a1a", fontSize: "24px", mt: "2px" }} />
          <div className="leading-tight">
            <p className="text-[14px] mt-2 font-semibold ml-1">Tài Khoản Của tôi</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Xem lịch đã đặt</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Ngân Hàng</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Địa Chỉ</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Đổi Mật Khẩu</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Cài Đặt Thông Báo</p>
            <p className="text-[14px] mt-2 font-semibold ml-1">Những Thiết Lập Riêng Tư</p>
          </div>
        </li>

        <li className="flex items-center space-x-2">
          <DescriptionIcon sx={{ color: "#d95a1a", fontSize: "24px" }} />
          <span className="text-[14px] mt-2 font-semibold ml-1 hover:cursor-pointer" onClick={() => {window.location.href = `/order-personal`}}>Đơn Mua</span>
        </li>

        <li className="flex items-center space-x-2">
          <CalendarTodayIcon sx={{ color: "#d95a1a", fontSize: "24px" }} />
          <span className="text-[14px] mt-2 font-semibold ml-1 hover:cursor-pointer" onClick={() => {window.location.href = `/booking-personal`}}>Lịch hẹn</span>
        </li>
      </ul>
    </div>
  );
}

export default NavbarCustomer;
