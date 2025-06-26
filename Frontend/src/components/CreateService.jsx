import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { ServiceService } from "../services/serviceService";
import { UploadService } from "../services/upload.service";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateService = ({ onCreate }) => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [userId, setUserId] = useState("");

  const getUserIdToLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setUserId(user._id);
    }
  };

  useEffect(() => {
    getUserIdToLocalStorage();
  }, []);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files) return;

    try {
      // Upload từng ảnh một
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);

        const response = await UploadService.uploadImage(formData);
        if (response && response.length > 0) {
          setUploadedImageUrls((prev) => [...prev, response[0].url]);
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleCreateService = async () => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    try {
      const service = {
        serviceName,
        description: serviceDesc,
        priceRange,
        image: uploadedImageUrls,
        userId,
      };

      await ServiceService.createService(service);
      navigate("/shop/service-manager");
      onCreate();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="max-w-full w-full mx-auto bg-white rounded-xl shadow-md p-0 md:p-6 mt-4">
      {/* Form */}
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="text-lg md:text-xl font-bold text-blue-900">
            Thêm dịch vụ mới
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button
              variant="contained"
              style={{ background: "#ff7a50", borderRadius: 20, minWidth: 100 }}
              onClick={handleCreateService}
            >
              Thêm mới
            </Button>
            <Button
              variant="contained"
              style={{ background: "#232c6a", borderRadius: 20, minWidth: 100 }}
              onClick={() => navigate("/shop/service-manager")}
            >
              Huỷ bỏ
            </Button>
          </div>
        </div>
        {/* Input fields */}
        <div className="mb-4">
          <div className="font-semibold text-blue-900 mb-1">Tên dịch vụ</div>
          <TextField
            fullWidth
            size="small"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder=""
            sx={{ background: "#fdebe4", borderRadius: 2 }}
          />
        </div>
        <div className="mb-4">
          <div className="font-semibold text-blue-900 mb-1">Mô tả dịch vụ</div>
          <div className="bg-[#fdebe4] rounded-md p-2">
            <CKEditor
              editor={ClassicEditor}
              data={serviceDesc}
              onChange={(event, editor) => {
                const data = editor.getData();
                setServiceDesc(data);
              }}
              config={{
                placeholder: "Nhập mô tả dịch vụ...",
              }}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="font-semibold text-blue-900 mb-1">Giá dịch vụ</div>
          <TextField
            fullWidth
            size="small"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder=""
            sx={{ background: "#fdebe4", borderRadius: 2 }}
          />
        </div>
        {/* Action buttons left */}
        <div className="flex justify-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              style={{
                background: "#e0e0e0",
                color: "#232c6a",
                borderRadius: 20,
                minWidth: 120,
                textAlign: "left",
              }}
            >
              Thêm hình ảnh
            </Button>
          </label>
        </div>
        {/* Display uploaded images */}
        {uploadedImageUrls.length > 0 && (
          <div className="mt-4">
            <div className="font-semibold text-blue-900 mb-2">
              Hình ảnh đã tải lên:
            </div>
            <div className="flex flex-wrap gap-2">
              {uploadedImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateService;
