import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";
import { ServiceService } from "@/services/serviceService";
import { UploadService } from "@/services/upload.service";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ServiceDetail = ({ onAddNew }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [service, setService] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await ServiceService.deleteService(id);
      setOpenDelete(false);
      navigate("/shop/service-manager");
    } catch (error) {
      console.error("Error deleting service:", error);
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
        setEditedService((prev) => ({
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
      await ServiceService.updateService(id, editedService);
      setService(editedService);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleCancel = () => {
    setEditedService(service);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchServicesById = async () => {
      try {
        const services = await ServiceService.getServiceById(id);
        setService(services);
        setEditedService(services);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchServicesById();
  }, [id]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Left: Content */}
      <div className="flex-1">
        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Tên dịch vụ</div>
            <TextField
              fullWidth
              size="small"
              value={editedService?.serviceName || ""}
              onChange={(e) =>
                setEditedService((prev) => ({
                  ...prev,
                  serviceName: e.target.value,
                }))
              }
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            />
          </div>
        ) : (
          <h2 className="text-xl font-bold text-blue-900">
            {service?.serviceName}
          </h2>
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">
              Mô tả dịch vụ
            </div>
            <div className="bg-[#fdebe4] rounded-md p-2">
              <CKEditor
                editor={ClassicEditor}
                data={editedService?.description || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditedService((prev) => ({
                    ...prev,
                    description: data,
                  }));
                }}
                config={{
                  placeholder: "Nhập mô tả dịch vụ...",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="text-xs text-gray-700 mb-2"
            dangerouslySetInnerHTML={{ __html: service?.description }}
          />
        )}

        {isEditing ? (
          <div className="mb-4">
            <div className="font-semibold text-blue-900 mb-1">Giá dịch vụ</div>
            <TextField
              fullWidth
              size="small"
              value={editedService?.priceRange || ""}
              onChange={(e) =>
                setEditedService((prev) => ({
                  ...prev,
                  priceRange: e.target.value,
                }))
              }
              sx={{ background: "#fdebe4", borderRadius: 2 }}
            />
          </div>
        ) : (
          <div className="text-xs text-gray-700 mb-2">
            Giá: {service?.priceRange} VNĐ
          </div>
        )}

        {/* Bảng giá */}
        <div className="rounded-xl border border-orange-300 p-4 mt-4 bg-orange-50">
          <div className="text-center text-orange-600 font-bold text-lg mb-2">
            BẢNG GIÁ DỊCH VỤ TẠI LULU SHOP
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-center">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-2 py-1">GÓI COMBO</th>
                  <th className="px-2 py-1">TRỌNG LƯỢNG</th>
                  <th className="px-2 py-1">CHÓ LÔNG NGẮN</th>
                  <th className="px-2 py-1">CHÓ LÔNG DÀI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-1">COMBO 1</td>
                  <td className="px-2 py-1">≤ 3kg</td>
                  <td className="px-2 py-1">100.000đ</td>
                  <td className="px-2 py-1">120.000đ</td>
                </tr>
                <tr>
                  <td>COMBO 1</td>
                  <td>3kg - 10kg</td>
                  <td>120.000đ</td>
                  <td>150.000đ</td>
                </tr>
                <tr>
                  <td>COMBO 1</td>
                  <td>10kg - 20kg</td>
                  <td>180.000đ</td>
                  <td>200.000đ</td>
                </tr>
                <tr>
                  <td>COMBO 1</td>
                  <td>20kg - 30kg</td>
                  <td>250.000đ</td>
                  <td>300.000đ</td>
                </tr>
                <tr>
                  <td>COMBO 1</td>
                  <td>≥ 30kg</td>
                  <td>350.000đ</td>
                  <td>400.000đ</td>
                </tr>
                <tr className="bg-orange-50">
                  <td>COMBO 2</td>
                  <td>≤ 3kg</td>
                  <td>150.000đ</td>
                  <td>180.000đ</td>
                </tr>
                <tr className="bg-orange-50">
                  <td>COMBO 2</td>
                  <td>3kg - 10kg</td>
                  <td>180.000đ</td>
                  <td>220.000đ</td>
                </tr>
                <tr className="bg-orange-50">
                  <td>COMBO 2</td>
                  <td>10kg - 20kg</td>
                  <td>250.000đ</td>
                  <td>300.000đ</td>
                </tr>
                <tr className="bg-orange-50">
                  <td>COMBO 2</td>
                  <td>20kg - 30kg</td>
                  <td>350.000đ</td>
                  <td>400.000đ</td>
                </tr>
                <tr className="bg-orange-50">
                  <td>COMBO 2</td>
                  <td>≥ 30kg</td>
                  <td>450.000đ</td>
                  <td>500.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
          {(isEditing ? editedService?.image : service?.image)?.map(
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
                      setEditedService((prev) => ({
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
            {service?.serviceName}
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
            Xoá dịch vụ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceDetail;
