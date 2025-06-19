import React from "react";
import Sidebar from "../components/shopSideBar";
import ProductCard from "../components/ProductCart";
import { useState, useEffect } from "react";
import { ProductService } from "@/services/productService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/routePath";

const ProductManager = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductService.getProducts();
      setProductList(products);
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(productList.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-[#f9f5f0] pt-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="w-2/3 text-center text-blue-800 text-lg font-normal select-none rounded-md bg-white py-2 shadow-sm">
                Sản phẩm
              </h2>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate(ROUTE_PATH.CREATE_PRODUCT)}
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
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  widthCard="full"
                  heightCard={300}
                  heightImage={150}
                  textSizeName="text-sm"
                  textSizeDescription="text-xs"
                  textSizePrice="text-sm"
                  buttonSize={36}
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

export default ProductManager;
