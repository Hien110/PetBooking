import React, { useEffect, useState } from "react";

import orderService from "@/services/orderService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Button } from "@mui/material";

export default function OrderSuccessPage() {
  const [orderSuccess, setOrderSuccess] = useState(null);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const timeVN = orderSuccess?.createdAt
    ? dayjs(orderSuccess.createdAt)
        .tz("Asia/Ho_Chi_Minh")
        .format("HH:mm - DD/MM/YYYY")
    : "Thời gian không xác định";

  useEffect(() => {
    const fetchOrderSuccess = async () => {
      try {
        const orderId = window.location.pathname.split("/").pop();
        const orderData = await orderService.getOrderById(orderId);
        setOrderSuccess(orderData);
        console.log("Order Data:", orderData);
      } catch (error) {
        console.error("Error fetching order success:", error);
      }
    };

    fetchOrderSuccess();
  }, []);

  return (
    <div className="bg-[#fefbf7] font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1
          className="text-[#2e3a8c] font-extrabold text-3xl text-center leading-tight mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          HOÀN THÀNH ĐẶT HÀNG
        </h1>
        <p
          className="text-[#2e3a8c] font-semibold text-lg text-center mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Cảm ơn quý khách đã tin tưởng dịch vụ của chúng tôi.
        </p>

        <div className="bg-white rounded-xl shadow-md max-w-3xl mx-auto p-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-[#2e3a8c]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="font-semibold text-base sm:text-lg leading-tight">
              Tên sản phẩm
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {orderSuccess?.products?.map((product, index) => (
                <span key={index}>
                  {product?.productId?.productName || "Sản phẩm không xác định"}
                  {product.quantity > 1 ? ` (x${product.quantity})` : ""}
                </span>
              ))}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Tên khách hàng
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {orderSuccess?.userId?.name || "Khách hàng không xác định"}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Thời gian đặt
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {timeVN}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Địa chỉ giao hàng
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {orderSuccess?.address || "Địa chỉ không xác định"}
            </div>

            <div className="font-semibold text-base sm:text-lg leading-tight">
              Số điện thoại
            </div>
            <div className="text-base sm:text-lg leading-tight">
              {orderSuccess?.phone || "Số điện thoại không xác định"}
            </div>
          </div>
        <button
          className="p-2 rounded-xl mt-8 bg-custom-orange flex items-center justify-center w-full hover:cursor-pointer text-white hover:bg-[#e35e25] transition-colors duration-300"
          onClick={() => (window.location.href = "/")}
        >
          Quay lại trang chủ
        </button>
        </div>
      </div>
    </div>
  );
}
