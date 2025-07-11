import React from "react";
import Sidebar from "../components/shopSideBar";
import ProductManageDetail from "@/components/ProductManageDetail";
import SubHeader from "@/components/SubHeader";

const ProductManageDetailPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

        <div className="w-full md:w-3/4 flex flex-col space-y-6">
          <SubHeader
            title={"Chi tiết Sản phẩm"}
            subTitle={"Thông tin chi tiết về sản phẩm của bạn"}
          />

          {/* Main content */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 w-full">
            <ProductManageDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManageDetailPage;
