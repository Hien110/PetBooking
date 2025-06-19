import { useState, useEffect } from 'react';
import { Slider, Button, Radio, RadioGroup, FormControlLabel, TextField, IconButton } from '@mui/material';
import { CategoryService } from '../services/categoryService';
import { ProductService } from '../services/productService';
import ProductCard from '../components/ProductCart';

function ProductPage() {
  const [priceRange, setPriceRange] = useState([1000, 10000000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([1000, 10000000]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Áp dụng bộ lọc giá
  const applyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
    setCurrentPage(1); // Reset về trang 1 khi áp dụng bộ lọc mới
  };

  // Hàm định dạng giá cho slider
  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  };

  // Lấy danh mục và sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Lọc sản phẩm theo nhiều tiêu chí
  useEffect(() => {
    let filtered = [...products];

    // Lọc theo tên sản phẩm
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (category) {
      filtered = filtered.filter((product) => 
        product.category && product.category.categoryName === category
      );
    }

    // Lọc theo khoảng giá
    filtered = filtered.filter((product) => 
      product.price >= appliedPriceRange[0] && product.price <= appliedPriceRange[1]
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  }, [searchTerm, category, appliedPriceRange, products]);

  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="max-w-7xl mx-auto p-4">
    
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thanh bên trái */}
          <aside className="flex-shrink-0 w-full md:w-60 space-y-6">
            {/* Bộ lọc giá */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-sm font-semibold text-[#1E1E4F] mb-2">Lọc theo giá</h3>
              <div className="text-xs text-gray-500 flex justify-between mb-1">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                min={1000}
                max={10000000}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                aria-label="Thanh trượt khoảng giá"
                sx={{
                  color: '#f97316',
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                    bgcolor: '#f97316',
                    borderRadius: '50%',
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={applyPriceFilter}
                sx={{
                  mt: 2,
                  bgcolor: '#f97316',
                  '&:hover': { bgcolor: '#ea580c' },
                  textTransform: 'none',
                  fontSize: '0.75rem',
                }}
              >
                ÁP DỤNG
              </Button>
            </div>

            {/* Danh mục sản phẩm */}
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="text-sm font-semibold text-[#1E1E4F] mb-3">Danh mục sản phẩm</h3>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-xs text-[#F97316] space-y-2"
              >
                <FormControlLabel
                  value=""
                  control={<Radio size="small" sx={{ color: '#f97316', '&.Mui-checked': { color: '#f97316' } }} />}
                  label="Tất cả"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                />
                {categories.map((cat) => (
                  <FormControlLabel
                    key={cat._id}
                    value={cat.categoryName}
                    control={<Radio size="small" sx={{ color: '#f97316', '&.Mui-checked': { color: '#f97316' } }} />}
                    label={cat.categoryName}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
                  />
                ))}
              </RadioGroup>
            </div>

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
                  placeholder="Tìm kiếm sản phẩm..."
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

            {/* Thông tin bộ lọc hiện tại */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Bộ lọc:</span>
              {appliedPriceRange[0] !== 1000 || appliedPriceRange[1] !== 10000000 ? (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Giá: {formatPrice(appliedPriceRange[0])} - {formatPrice(appliedPriceRange[1])}
                </span>
              ) : null}
              {category && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Danh mục: {category}
                </span>
              )}
              {(appliedPriceRange[0] !== 1000 || appliedPriceRange[1] !== 10000000 || category) && (
                <button 
                  onClick={() => {
                    setCategory('');
                    setPriceRange([1000, 10000000]);
                    setAppliedPriceRange([1000, 10000000]);
                  }}
                  className="text-xs text-orange-600 hover:text-orange-800"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Tiêu đề */}
            <h2 className="text-lg font-bold text-[#1E1E4F] mb-4">Sản phẩm ({filteredProducts.length})</h2>

            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    widthCard={200}
                    heightCard={300}
                    heightImage={150}
                    textSizeName={14}
                    textSizeDescription={12}
                    textSizePrice={14}
                    buttonSize={36}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-600 col-span-full text-center">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
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

export default ProductPage;