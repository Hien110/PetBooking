import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import orderService from "@/services/orderService";

export default function OrderPage() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const { product, quantity } = location.state || {};

  const handleSubmit = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đặt hàng");
      return;
    }

    const products = [
      {
        productId: product._id,
        quantity,
      },
    ];
    const orderData = {
      products,
      userId: user._id,
      totalPrice: product.price * quantity + 20000, // Giả sử phí vận chuyển là 20.000 đ
      address: user.address,
      phone: user.phone,
    };

    try {
      const newOrder = await orderService.createOrder(orderData);
      navigate(`/order/order-success/${newOrder._id}`);
      console.log("New Order:", newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đặt hàng thất bại");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    } else if (user && (!user.address || !user.name || !user.phone)) {
      navigate(`/profile/${user._id}`);
    } else {
      setUser(user);
    }
  }, []);

  return (
    <div className="bg-[#fffaf7] font-sans text-[14px] leading-[20px] text-[#2a2e6a] min-h-screen">
      <div className="max-w-[900px] mx-auto p-4 space-y-4">
        {/* Address bar */}
        <div className="bg-[#2a2e6a] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
          <div className="text-[#fff] text-[16px] font-normal mb-2 sm:mb-0">
            Địa Chỉ Nhận Hàng
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-[#fff] text-[16px] font-semibold">
            <span>
              {user?.name} <br /> (+84) {user?.phone}
            </span>
            <span className="sm:ml-6 font-normal max-w-[400px] truncate">
              {user?.address ? user.address : "Chưa có địa chỉ nhận hàng"}
            </span>
          </div>
          <button
            className="mt-3 sm:mt-0 bg-custom-orange text-white rounded-full px-6 py-2 text-[14px] font-semibold whitespace-nowrap hover:bg-[#e35e25] transition-colors duration-300 hover:cursor-pointer"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            Thay đổi
          </button>
        </div>

        {/* Table header */}
        <div className="bg-white rounded-xl shadow-md flex text-custom-orange text-[14px] font-normal px-6 py-3 select-none">
          <div className="flex-1">Sản Phẩm</div>
          <div className="w-[100px] text-center">Đơn Giá</div>
          <div className="w-[100px] text-center">Số Lượng</div>
          <div className="w-[100px] text-center">Thành tiền</div>
        </div>

        {/* Shop container */}
        <div className="bg-white rounded-xl shadow-md border border-[#2a2e6a] border-opacity-30">
          {/* Shop header */}
          <div className="flex items-center space-x-2 border-b border-[#2a2e6a] border-opacity-30 px-4 py-2 text-custom-orange font-semibold text-[14px]">
            <input
              aria-label="Select Lulu Shop"
              defaultChecked
              type="radio"
              className="custom-radio w-4 h-4 cursor-pointer border-custom-orange border-2 rounded-full"
            />
            <span>LULU SHOP</span>
          </div>

          {/* Product row */}
          <div className="flex items-center border-b border-[#2a2e6a] border-opacity-30 px-4 py-3 space-x-4">
            <input
              aria-label="Select product"
              defaultChecked
              type="radio"
              className="custom-radio w-4 h-4 cursor-pointer border-custom-orange border-2 rounded-full"
            />
            <img
              src={product?.image || "/img/defaultProduct.jpg"}
              alt="Snack Tell me cho Chó"
              className="w-[80px] h-[80px] object-cover rounded"
              width="80"
              height="80"
            />
            <div className="flex-1 text-[#2a2e6a]">{product?.productName}</div>
            <div className="w-[100px] text-center text-[16px]">
              {product?.price?.toLocaleString("vi-VN")} đ
            </div>
            <div className="w-[100px] text-center text-[16px]">{quantity}</div>
            <div className="w-[100px] text-center text-[16px]">
              {(product?.price * quantity)?.toLocaleString("vi-VN")} đ
            </div>
          </div>

          {/* Voucher */}
          {/* <div className="flex justify-between text-[#2a2e6a] text-[14px] font-normal px-4 py-2 select-none">
            <div className="text-center flex-1 border-t border-[#2a2e6a] border-opacity-30 pt-2">
              Voucher của shop
            </div>
            <div className="text-center flex-1 border-t border-[#2a2e6a] border-opacity-30 pt-2 cursor-pointer hover:underline">
              Chọn voucher khác
            </div>
          </div> */}
        </div>

        {/* Shipping method */}
        <div className="bg-white rounded-xl shadow-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-[#2a2e6a] mr-8">Phương thức vận chuyển</div>
          <div className="flex-1 text-[#2a2e6a] font-semibold max-w-[600px]">
            <div>Vận Chuyển Nhanh</div>
            <div className="font-normal">
              Quốc tế tiêu chuyển - Stantand International
            </div>
            <div className="font-normal">
              Đảm bảo nhận hàng từ ngày 1 tháng 7 - 3 tháng 7
            </div>
          </div>
          <button className="bg-custom-orange text-white rounded-full px-6 py-2 text-[14px] font-semibold whitespace-nowrap">
            Thay đổi
          </button>
        </div>

        {/* Payment summary */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-12 text-custom-orange text-[14px] font-normal">
          <div className="mb-1 text-[12px] text-center sm:text-left">
            Thanh toán khi nhận hàng
          </div>
          <div className="flex flex-col space-y-2 text-right w-full sm:w-auto">
            <div className="flex justify-between max-w-[300px]">
              <div>Tổng tiền hàng</div>
              <div>
                {(product?.price * quantity)?.toLocaleString("vi-VN")} đ
              </div>
            </div>
            <div className="flex justify-between max-w-[300px]">
              <div>Tổng tiền phí vận chuyển</div>
              <div>20.000 đ</div>
            </div>
            {/* <div className="flex justify-between max-w-[300px]">
              <div>Tổng cộng Voucher giảm giá</div>
              <div>-đ1.000</div>
            </div> */}
            <div className="flex justify-between max-w-[300px] text-[24px] font-bold text-[#2a2e6a] pt-2">
              <div>Tổng thanh toán: </div>
              <div>
                {(product?.price * quantity + 20000)?.toLocaleString("vi-VN")} đ
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#2a2e6a] border-opacity-30" />

        {/* Bottom bar */}
        <div className=" flex items-center justify-end px-6 py-3 text-[#2a2e6a] text-[14px] font-normal">
          {/* <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              aria-label="Chọn tất cả"
              type="radio"
              className="custom-radio w-4 h-4 border-custom-orange border-2 rounded-full"
            />
            <span className="text-custom-orange">Chọn tất cả(51)</span>
          </label>
          <div className="flex-1 text-center">
            Tổng thanh toán ( 0 sản phẩm):{" "}
            <span className="text-custom-orange">0đ</span>
          </div> */}
          <button
            className="bg-custom-orange text-white rounded-full px-8 py-3 text-[16px] font-bold whitespace-nowrap flex items-center justify-end hover:bg-[#e35e25] hover:cursor-pointer transition-colors duration-300"
            onClick={handleSubmit}
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
}
