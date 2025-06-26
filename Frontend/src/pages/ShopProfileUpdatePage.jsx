import React, { useEffect, useState } from "react";
import Sidebar from "../components/shopSideBar";
import SubHeader from "@/components/SubHeader";
import { UserService } from "@/services/userService";

const UpdateShopProfilePage = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    phone: "",
    address: "",
    description: "",
    avatar: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "shop") return;

    setFormData({
      _id: user._id,
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      description: user.description || "",
      avatar: user.avatar || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateProfileShop(formData);
      setMessage("Cập nhật thông tin thành công!");
    } catch (err) {
      setMessage(err.message);
    }
  };

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
            title="Cập nhật thông tin cửa hàng"
            subTitle="Thay đổi thông tin hồ sơ của bạn"
          />

          <form
            onSubmit={handleUpdate}
            className="bg-white shadow-md rounded-lg p-6 space-y-4"
          >
            {message && (
              <div className="text-sm font-medium text-red-600">{message}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên cửa hàng
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link ảnh đại diện
              </label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="mt-2 w-24 h-24 rounded-full object-cover border"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-[#FF6B3C] text-white px-4 py-2 rounded hover:bg-[#e05e2f]"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateShopProfilePage;
