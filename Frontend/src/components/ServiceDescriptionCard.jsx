import React from "react";

function ServiceDescriptionCart({ service }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)] my-10 mx-20">
      <h2 className="text-2xl font-semibold mb-4">Mô Tả Dịch Vụ</h2>
      <p className="text-gray-700 mb-4">Thông tin chi tiết về dịch vụ:</p>
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{
          __html: service?.description || "<p>Mô Tả Dịch Vụ</p>",
        }}
      ></div>
    </div>
  );
}

export default ServiceDescriptionCart;
