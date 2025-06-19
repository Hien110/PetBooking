import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { ProductService } from "@/services/productService";
import { UploadService } from "@/services/upload.service";
import { CategoryService } from "@/services/categoryService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductManageDetail = ({ onAddNew }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(id);
      setOpenDelete(false);
      navigate("/shop/product-manager");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files) return;

    try {
      const formData = new FormData();
      formData.append("image", files[0]);
      const response = await UploadService.uploadImage(formData);
      if (response && response.length > 0) {
        setEditedProduct((prev) => ({
          ...prev,
          image: [...prev.image, response[0].url],
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = async () => {
    try {
      await ProductService.updateProduct(id, editedProduct);
      setProduct(editedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const products = await ProductService.getProductById(id);
        setProduct(products);
        setEditedProduct(products);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchProductById();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoryService.getCategories();
        setCategories(categories);
        setCategoryName(categories[0].categoryName);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Left: Content */}
      <div className="flex-1">
        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Tên sản phẩm</div>
            <TextField
              fullWidth
              size="small"
              value={editedProduct?.productName || ""}
              onChange={(e) =>
                setEditedProduct((prev) => ({
                  ...prev,
                  productName: e.target.value,
                }))
              }
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            />
          </div>
        ) : (
          <h2 className="text-xl font-bold text-blue-900 mb-6">
            {product?.productName}
          </h2>
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">
              Mô tả sản phẩm
            </div>
            <div className="bg-[#fdebe4] rounded-md p-2">
              <CKEditor
                editor={ClassicEditor}
                data={editedProduct?.description || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditedProduct((prev) => ({
                    ...prev,
                    description: data,
                  }));
                }}
                config={{
                  placeholder: "Nhập mô tả sản phẩm...",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="text-xs text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Giá sản phẩm</div>
            <TextField
              fullWidth
              size="small"
              value={editedProduct?.price || ""}
              onChange={(e) =>
                setEditedProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-700 mb-6">
            Giá: {product?.price} VNĐ
          </div>
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Số lượng</div>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={editedProduct?.quantity || ""}
              onChange={(e) =>
                setEditedProduct((prev) => ({
                  ...prev,
                  quantity: e.target.value,
                }))
              }
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-700 mb-6">
            Số lượng: {product?.quantity}
          </div>
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Danh mục</div>
            <FormControl
              fullWidth
              size="small"
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            >
              <Select
                value={editedProduct?.category || ""}
                onChange={(e) =>
                  setEditedProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Chọn danh mục
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ) : (
          <div className="text-xs text-gray-700 mb-6">
            Danh mục: {categoryName}
          </div>
        )}

        {isEditing && (
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu thay đổi
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Hủy
            </Button>
          </div>
        )}
      </div>

      {/* Right: Images */}
      <div className="flex flex-col items-center w-full md:w-[220px] lg:w-[260px] mt-6 md:mt-0">
        {/* Buttons */}
        <div className="flex flex-col gap-2 mb-4 w-full">
          <Button
            variant="contained"
            color="warning"
            size="small"
            className="w-full"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            className="w-full"
            onClick={() => setOpenDelete(true)}
          >
            Xoá dịch vụ
          </Button>
        </div>

        {/* Image upload button */}
        {isEditing && (
          <div className="w-full mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                fullWidth
                color="primary"
              >
                Thêm hình ảnh
              </Button>
            </label>
          </div>
        )}

        {/* Images */}
        <div className="flex flex-col gap-4 w-full">
          {(isEditing ? editedProduct?.image : product?.image)?.map(
            (imgUrl, idx) => (
              <div key={idx} className="relative">
                <img
                  src={imgUrl}
                  alt={`service-img-${idx}`}
                  className="rounded-lg object-cover w-full h-[110px] shadow-md"
                />
                {isEditing && (
                  <Button
                    size="small"
                    color="error"
                    className="absolute top-1 right-1"
                    onClick={() => {
                      setEditedProduct((prev) => ({
                        ...prev,
                        image: prev.image.filter((_, i) => i !== idx),
                      }));
                    }}
                  >
                    X
                  </Button>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent className="pt-6 pb-2">
          <Typography
            align="center"
            fontWeight={600}
            fontSize={15}
            className="mb-2"
          >
            Bạn có chắc chắn muốn xoá dịch vụ:
          </Typography>
          <Typography
            align="center"
            fontWeight={700}
            fontSize={18}
            color="#2d3a8c"
          >
            {product?.productName}
          </Typography>
        </DialogContent>
        <DialogActions className="flex justify-center pb-4">
          <Button
            onClick={() => setOpenDelete(false)}
            variant="contained"
            style={{ background: "#ff7a50" }}
          >
            Huỷ bỏ
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            style={{ background: "#2d3a8c" }}
          >
            Xoá sản phẩm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductManageDetail;
