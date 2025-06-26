import React from "react";
import Sidebar from "../components/shopSideBar";
import CreateService from "../components/CreateService";
import SubHeader from "@/components/SubHeader";

const CreateServicePage = () => {
  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>

          <div className="w-full md:w-3/4 flex flex-col space-y-6">
            <SubHeader
            title={"Chi tiết Dịch vụ"}
            subTitle={"Thông tin chi tiết về dịch vụ của bạn"}
          />
            {/* Main content */}
            <CreateService />
          </div>
        </div>
      </div>
  );
};

export default CreateServicePage;
