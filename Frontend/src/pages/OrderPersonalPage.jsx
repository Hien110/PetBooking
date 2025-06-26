import React, { useState, useEffect } from "react";

import NavbarCustomer from "../components/NavbarCustomer";
import SubHeader from "../components/SubHeader";

import { UserService } from "../services/userService";
import orderService from "../services/orderService";

function OrderPersonalPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const fetchUser = async () => {
      try {
        const user = await UserService.getUserById(userId);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();

    const fetchOrders = async () => {
      try {
        const userOrders = await orderService.getOrderByUserId(userId);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-[#FFFAF6] font-sans text-sm text-gray-900">
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Tabs */}
        <div className="col-span-1">
          <NavbarCustomer user={user} />
        </div>
        <div className="col-span-3">
          <SubHeader
            title={"Đơn hàng của tôi"}
            subTitle={"Quản lý thông tin đơn hàng của bạn"}
          />
          <div className=" bg-white rounded-xl shadow-md p-6">
            <nav className="border-b border-gray-200">
              <ul
                className="flex overflow-x-auto scrollbar-hide whitespace-nowrap text-center text-gray-800"
                role="tablist"
              >
                {[
                  "Tất cả",
                  "Đang chuẩn bị",
                  "Đang giao hàng",
                  "Hoàn thành",
                  "Đã hủy",
                ].map((label, i) => (
                  <li className="flex-1" key={i}>
                    <button
                      className={`w-full py-3 ${
                        i === 0
                          ? "text-orange-500 border-b-2 border-orange-500"
                          : "hover:text-gray-900"
                      }
                      hover:cursor-pointer focus:outline-none`}
                      role="tab"
                      tabIndex={i === 0 ? 0 : -1}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search */}
            <div className="p-3 bg-white-100">
              <div className="flex items-center bg-gray-200 rounded-md px-3 py-2 text-gray-400 text-sm">
                <i className="fas fa-search mr-2"></i>
                <input
                  type="text"
                  className="bg-transparent w-full focus:outline-none placeholder-gray-400 text-xs"
                  placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
                />
              </div>
            </div>

            {/* Orders */}
            <section className="divide-y divide-gray-200">
              {orders.map((order, i) => (
                <article className="flex justify-between px-3 py-3 space-x-3" key={i}>
                  {order.products.map((item, j) => (
                    <div className="flex space-x-3" key={j}>
                      <img
                        src={item.productId.image[0]}
                        alt={item.productId.title}
                        className="w-14 h-14 object-contain flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-xs leading-tight">
                          {item.productId.productName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Phân loại hàng: Thức ăn cho chó
                          <span className="text-gray-500">{item.variant}</span>
                        </p>
                        <p className="text-xs text-gray-900 mt-1 select-none">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col items-end">
                    <span className="text-[16px] text-orange-500">
                      ₫ {order.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">{order.status}</span>
                  </div>
                </article>
              ))}
            </section>

            {/* Footer */}
            {/* <div className="flex justify-end items-center space-x-3 px-3 py-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1 text-teal-600 select-none">
                <i className="fas fa-truck"></i>
                <span>Giao hàng thành công</span>
                <button className="text-gray-400 hover:text-gray-600 focus:text-gray-600">
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
              <span className="text-orange-500 font-semibold select-none">
                HOÀN THÀNH
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPersonalPage;
