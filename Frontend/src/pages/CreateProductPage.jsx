import React from "react";
import Sidebar from "../components/shopSideBar";
import CreateProduct from "@/components/CreateProduct";
import SubHeader from "@/components/SubHeader";

const CreateProductPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
           <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

          <div className="w-full md:w-3/4 flex flex-col space-y-6">
            <SubHeader
            title={"Thêm mới Sản phẩm"}
            subTitle={"Thêm mới sản phẩm của bạn"}
          />

            {/* Main content */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6 w-full">
              <CreateProduct />
            </div>
          </div>
        </div>
    </div>
  );
};

export default CreateProductPage;
