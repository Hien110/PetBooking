import React from "react";
import Sidebar from "../components/shopSideBar";
import ProductManageDetail from "@/components/ProductManageDetail";

const ProductManageDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex-1 bg-white rounded-lg shadow-md p-6 w-full">
            <h2 className="text-center text-blue-800 text-lg font-normal mb-6 select-none rounded-md bg-white py-2 shadow-sm">
              Sản Phẩm
            </h2>

            {/* Main content */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 w-full">
              <ProductManageDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManageDetailPage;
