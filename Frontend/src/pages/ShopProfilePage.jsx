import React, { useEffect, useState } from "react";
import Sidebar from "../components/shopSideBar";
import SubHeader from "@/components/SubHeader";
import { UserService } from "@/services/userService";

const ShopProfilePage = () => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role !== "shop") return;

      try {
        const shopData = await UserService.getUserById(user._id);
        setShop(shopData);
      } catch (err) {
        console.error("Không thể lấy thông tin shop:", err.message);
      }
    };
    fetchShop();
  }, []);

  if (!shop) return <div className="p-4">Đang tải thông tin shop...</div>;

  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 flex flex-col space-y-6">
          <SubHeader title="Thông tin cửa hàng" subTitle="Chi tiết hồ sơ của bạn" />

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-6">
              <img
                src={shop.avatar || "/img/defaultAvatar.jpg"}
                alt="avatar"
                className="w-32 h-32 rounded-full border object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold text-[#FF6B3C]">{shop.name}</h2>
                <p className="text-gray-600">{shop.email}</p>
                <p className="text-gray-600">SĐT: {shop.phone || "Chưa cập nhật"}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-[15px] text-[#4B4B4B]">
              <div>
                <strong>Mô tả:</strong> <p>{shop.description || "Chưa có mô tả"}</p>
              </div>
              <div>
                <strong>Địa chỉ:</strong> <p>{shop.address || "Chưa cập nhật"}</p>
              </div>
              <div>
                <strong>Ngày sinh:</strong>{" "}
                <p>
                  {shop.dob
                    ? new Date(shop.dob).toLocaleDateString("vi-VN")
                    : "Chưa cung cấp"}
                </p>
              </div>
              <div>
                <strong>Trạng thái tài khoản:</strong> <p>{shop.status}</p>
              </div>
              <div>
                <strong>Vai trò:</strong> <p>{shop.role}</p>
              </div>
            
            </div>

            <button
              onClick={() => {
                window.location.href = `/shop/update-profile`;
              }}
              className="mt-6 px-4 py-2 bg-custom-orange text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProfilePage;
