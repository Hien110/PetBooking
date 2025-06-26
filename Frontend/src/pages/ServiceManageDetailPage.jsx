import React from "react";
import Sidebar from "../components/shopSideBar";
import ServiceDetail from "../components/ServiceDetail";
import SubHeader from "@/components/SubHeader";

const ServiceManageDetailPage = () => {
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
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 w-full">
            <ServiceDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManageDetailPage;
