import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "shop") {
    return null; // Return null if user is not a shop owner
  }

  const handleClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getButtonStyle = (path) => {
    const baseStyle =
      "text-sm rounded-lg px-4 py-2.5 text-left transition-colors duration-200";
    if (isActive(path)) {
      return `${baseStyle} text-white bg-orange-500 border border-orange-500 hover:bg-orange-600`;
    }
    return `${baseStyle} text-gray-700 bg-white border border-gray-200 hover:bg-gray-50`;
  };

  return (
    <div className="flex-shrink-0 w-full p-4 bg-[#FFFAF6] border-r border-gray-200">
      <div className="flex flex-col space-y-3">
        <div className="rounded-lg bg-white px-5 py-3 text-sm text-gray-700 shadow-sm">
          Xin Chào
          <div className="mt-1 font-pacifico text-orange-500 font-bold text-[24px] leading-none">
            {user.name}
          </div>
        </div>
        <button
          onClick={() => handleClick("/shop/profile")}
          className={getButtonStyle("/shop/profile")}
        >
          Quản lí cửa hàng
        </button>
        <button
          onClick={() => handleClick("/shop/revenue")}
          className={getButtonStyle("/shop/revenue")}
        >
          Quản lí doanh thu
        </button>
        <button
          onClick={() => handleClick("/shop/service-manager")}
          className={getButtonStyle("/shop/service-manager")}
        >
          Quản lí dịch vụ
        </button>
        <button
          onClick={() => handleClick("/shop/product-manager")}
          className={getButtonStyle("/shop/product-manager")}
        >
          Quản lí sản phẩm
        </button>

        <button
          onClick={() => handleClick("/shop/order-shop")}
          className={getButtonStyle("/shop/order-shop")}
        >
          Quản lí đặt hàng
        </button>
        <button
          onClick={() => handleClick("/shop/booking-shop")}
          className={getButtonStyle("/shop/booking-shop")}
        >
          Quản lí đặt dịch vụ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
