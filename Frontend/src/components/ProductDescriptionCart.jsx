import React from "react";

function ProductDescriptionCart({ product }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)] my-10 mx-20">
      <h2 className="text-2xl font-semibold mb-4">Mô Tả Sản Phẩm</h2>
      <p className="text-gray-700 mb-4">Thông tin chi tiết về sản phẩm:</p>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{
          __html: product?.description || "<p>Mô Tả Sản Phẩm</p>",
        }}
      ></div>
    </div>
  );
}

export default ProductDescriptionCart;
