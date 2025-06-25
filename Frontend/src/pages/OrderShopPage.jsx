import React from "react";
import { useState, useEffect } from "react";

import Sidebar from "../components/shopSideBar";
import ProductCardShop from "../components/ProductCardShop";

import SubHeader from "@/components/SubHeader";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import orderService from "@/services/orderService";

const OrderShopPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "shop") {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrderBySellerId(user._id);
        // Do something with the orders if needed
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 flex flex-col space-y-6">
          <SubHeader
            title={"Quản lý đơn hàng"}
            subTitle={"Quản lý thông tin đơn hàng của bạn"}
          />
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="max-w-full overflow-x-auto">
              <div className="flex space-x-2 mb-4">
                {[
                  "Đơn đặt hàng",
                  "Đã đóng gói",
                  "Đang vận chuyển",
                  "Giao hàng thành công",
                  "Huỷ hàng / Trả hàng",
                ].map((label, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${
                      i === 0
                        ? "bg-[#FF6B3C] text-white"
                        : "bg-[#F3F3F3] text-[#4B4B4B]"
                    } rounded-full px-4 py-1 text-[14px] font-semibold`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <table className="w-full border border-[#FF6B3C] border-collapse text-left text-[10px] font-normal text-[#4B4B4B]">
                <thead>
                  <tr>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[18%] text-[14px]">
                      Tên sản phẩm
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[12%] text-[14px]">
                      Ngày đặt
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[8%] text-[14px]">
                      Số lượng
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[15%] text-[14px]">
                      Tên khách hàng
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[20%] text-[14px]">
                      Địa chỉ
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[15%] text-[14px]">
                      Tổng tiền
                    </th>
                    <th className="border border-[#FF6B3C] px-2 py-1 text-[#2B6CB0] font-semibold w-[12%] text-[14px]">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.products.map((product, i) => (
                      <tr key={`${index}-${i}`} className="align-top">
                        {/* Tên sản phẩm */}
                        <td className="border border-[#FF6B3C] px-2 py-1">
                          <div className="font-semibold leading-tight text-[14px]">
                            {product.productId?.productName}
                          </div>
                        </td>

                        {/* Ngày đặt - chỉ hiển thị ở hàng đầu tiên của đơn hàng */}
                        {i === 0 && (
                          <td
                            className="border border-[#FF6B3C] px-2 py-1 text-[14px]"
                            rowSpan={order.products.length}
                          >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        )}

                        {/* Số lượng sản phẩm */}
                        <td className="border border-[#FF6B3C] px-2 py-1 text-[14px]">
                          {product.quantity}
                        </td>

                        {/* Tên khách hàng */}
                        {i === 0 && (
                          <td
                            className="border border-[#FF6B3C] px-2 py-1 text-[14px]"
                            rowSpan={order.products.length}
                          >
                            {order.userId?.name || "Ẩn danh"}
                          </td>
                        )}

                        {/* Địa chỉ */}
                        {i === 0 && (
                          <td
                            className="border border-[#FF6B3C] px-2 py-1 text-[14px]"
                            rowSpan={order.products.length}
                          >
                            {order.address}
                          </td>
                        )}

                        {/* Tổng tiền */}
                        {i === 0 && (
                          <td
                            className="border border-[#FF6B3C] px-2 py-1 text-[14px]"
                            rowSpan={order.products.length}
                          >
                            {order.totalPrice.toLocaleString("vi-VN")} VND
                          </td>
                        )}

                        {/* Trạng thái + nút hành động */}
                        {i === 0 && (
                          <td
                            className="border border-[#FF6B3C] px-2 py-1 text-[14px]"
                            rowSpan={order.products.length}
                          >
                            <button
                              type="button"
                              className="bg-[#FF6B3C] text-white text-[14px] font-semibold rounded px-3 py-1 hover:bg-[#FF6B3C]/90"
                            >
                              Xác nhận đóng gói
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderShopPage;
