import { useState, useEffect } from 'react';
import { Button, TextField, IconButton } from '@mui/material';

import { UserService } from '../services/userService';
import ShopCard from '../components/ShopCart';

function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 8;


  // Tính toán cửa hàng hiển thị trên trang hiện tại
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Lấy cửa hàng
  useEffect(() => {

    const fetchShops = async () => {
      try {
        const data = await UserService.getShop();
        setShops(data);
        setFilteredShops(data);
      } catch (error) {
        console.error("Lỗi khi lấy cửa hàng:", error);
      }
    };
    fetchShops();
  }, []);

  // Lọc cửa hàng theo nhiều tiêu chí
  useEffect(() => {
    let filtered = [...shops];

    // Lọc theo tên cửa hàng
    if (searchTerm) {
      filtered = filtered.filter((shop) =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredShops(filtered);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  }, [searchTerm, shops]);

  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        {/* Banner Slider */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thanh bên trái */}
          <aside className="flex-shrink-0 w-full md:w-60 space-y-6">

            {/* Bản đồ */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden shadow">
              <img
                alt="Bản đồ hiển thị vị trí với các điểm đánh dấu đỏ"
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/a1aa/image/ef2cd366-a061-4bc9-ba96-3437024a732c.jpg"
                width="240"
                height="192"
              />
              <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                Bản đồ
              </div>
            </div>
          </aside>

          {/* Nội dung chính */}
          <main className="flex-1">
            {/* Tìm kiếm */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md w-full">
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm cửa hàng..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="Tìm kiếm">
                        <i className="fas fa-search text-[#F97316]"></i>
                      </IconButton>
                    ),
                    sx: {
                      borderRadius: '0.375rem',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      fontSize: '0.75rem',
                      color: '#1E1E4F',
                    },
                  }}
                  sx={{ '& .MuiInputBase-input::placeholder': { color: '#f97316', opacity: 1 } }}
                />
              </div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#f97316',
                  '&:hover': { bgcolor: '#ea580c' },
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  px: 4,
                  py: 1,
                }}
              >
                Tìm kiếm
              </Button>
            </div>

            {/* Tiêu đề */}
            <h2 className="text-lg font-bold text-[#1E1E4F] mb-4">Cửa Hàng ({filteredShops.length})</h2>

            {/* Lưới cửa hàng */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentShops.length > 0 ? (
                currentShops.map((shop) => (
                  <ShopCard
                    key={shop._id}
                    shop={shop}
                    width={200}
                    height={320}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-600 col-span-full text-center">
                  Không tìm thấy cửa hàng nào phù hợp với bộ lọc.
                </p>
              )}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <nav className="flex justify-center mt-6">
                <ul className="flex items-center space-x-1">
                  {/* Nút trang trước */}
                  <li>
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'}`}
                    >
                      &lt;
                    </button>
                  </li>

                  {/* Các nút trang */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <li key={number}>
                      <button
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-[#F97316] text-white' : 'text-gray-700 hover:bg-orange-100'}`}
                      >
                        {number}
                      </button>
                    </li>
                  ))}

                  {/* Nút trang sau */}
                  <li>
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-orange-100'}`}
                    >
                      &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;