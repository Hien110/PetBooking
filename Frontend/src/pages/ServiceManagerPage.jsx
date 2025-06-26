import React from "react";
import Sidebar from "../components/shopSideBar";

import { useState, useEffect } from "react";
import { ServiceService } from "@/services/serviceService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/routePath";
import SubHeader from "@/components/SubHeader";
import ServiceShopCard from "@/components/ServiceShopCard";

const ServiceManager = () => {
  const [serviceList, setServiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "shop") {
      navigate(ROUTE_PATH.HOME);
    }
    const fetchServices = async () => {
      const services = await ServiceService.getServiceByUserId(user._id);
      setServiceList(services);
    };
    fetchServices();
  }, [navigate]);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = serviceList.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(serviceList.length / servicesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            title={"Quản lý Dịch vụ"}
            subTitle={"Quản lí về dịch vụ của bạn"}
          />
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate(ROUTE_PATH.CREATE_SERVICE)}
                style={{
                  background: "#ff7a50",
                  borderRadius: 20,
                  minWidth: 100,
                }}
              >
                Thêm mới
              </Button>
            </div>

            {/* Product grid - 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentServices.map((service) => (
                <ServiceShopCard
                  key={service._id}
                  service={service}
                  widthCard={200}
                  heightCard={320}
                  heightImage={160}
                  textSizeName={14}
                  textSizeDescription={12}
                  textSizePrice={14}
                  buttonSize={16}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2 text-sm text-gray-500 select-none">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-default"
                      : "hover:bg-gray-100"
                  }`}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded ${
                        currentPage === number
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-default"
                      : "hover:bg-gray-100"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManager;
