
import React, { useEffect, useState } from "react";


import Header from "../components/Header"; 
import Footer from "../components/Footer";
import ServiceDetailCard from "../components/ServiceDetailCard";
import ProductShopTag from "../components/ProductShopTag";
import ServiceDescriptionCard from "../components/ServiceDescriptionCard";
import ProductReviewCart from "../components/ProductReviewCart";

import { ServiceService } from "../services/serviceService";

function ServiceDetailPage() {
  const [service, setService] = useState(null);


  useEffect(() => {
    const serviceId = window.location.pathname.split("/").pop();
    const fetchService = async () => {
      try {
        const service = await ServiceService.getServiceById(serviceId);
        console.log("Fetched service:", service);
        
        setService(service);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
      
    };
    fetchService();
  }, []);

  return (
    <div className="bg-[#FFFAF6] min-h-screen">
      <ServiceDetailCard service={service} />
      <ProductShopTag user={service?.userId} />
      <ServiceDescriptionCard service={service} />
      <h2 className="text-2xl font-bold mb-4 mx-20 text-custom-orange">Đánh Giá Dịch Vụ</h2>
    <ProductReviewCart />
    </div>
  );
}

export default ServiceDetailPage;