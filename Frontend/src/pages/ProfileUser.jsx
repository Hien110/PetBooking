import { useEffect, useState } from "react";

import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';

import NavbarCustomer from "../components/NavbarCustomer";
import SubHeader from "../components/SubHeader";
import { UserService } from "../services/userService";
import EditProfileDialog from "@/components/EditProfileDialog";

const ProfileUser = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const userId = window.location.pathname.split("/").pop();
    const fetchUser = async () => {
      try {
        const user = await UserService.getUserById(userId);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-[#FFFAF6] min-h-screen ">
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1">
          <NavbarCustomer user={user} />
        </div>
        <div className="col-span-3">
          <SubHeader
            title={"Hồ sơ của tôi"}
            subTitle={"Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn"}
          />
            <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-12">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="name"
                    className="w-28 font-semibold text-sm text-black select-none"
                  >
                    Tên
                  </label>
                  <TextField
                    id="name"
                    variant="outlined"
                    size="small"
                    placeholder=""
                    fullWidth
                    value={user?.name ?? ""}
                    InputProps={{ className: "bg-[#fef3ef]" }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="address"
                    className="w-28 font-semibold text-sm text-black select-none"
                  >
                    Địa chỉ
                  </label>
                  <TextField
                    id="address"
                    variant="outlined"
                    size="small"
                    placeholder=""
                    fullWidth
                    value={user ? user.address : "Chưa cập nhật"}
                    InputProps={{ className: "bg-[#fef3ef]" }}
                  />
                </div>
                <div className="flex items-center gap-4 relative">
                  <label
                    htmlFor="email"
                    className="w-28 font-semibold text-sm text-black select-none"
                  >
                    Email
                  </label>
                  <TextField
                    id="email"
                    variant="outlined"
                    size="small"
                    placeholder=""
                    fullWidth
                    value={user ? user.email : ""}
                    InputProps={{
                      className: "bg-[#fef3ef]",
                    }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="phone"
                    className="w-28 font-semibold text-sm text-black select-none"
                  >
                    Số điện thoại
                  </label>
                  <TextField
                    id="phone"
                    type="tel"
                    variant="outlined"
                    size="small"
                    placeholder=""
                    fullWidth
                    value={user ? user.phone : ""}
                    InputProps={{ className: "bg-[#fef3ef]" }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-28 font-semibold text-sm text-black select-none">
                    Giới tính
                  </span>
                  <RadioGroup row name="gender" defaultValue="nam">
                    <FormControlLabel
                      value="nam"
                      control={<Radio />}
                      label="Nam"
                      {...(user && user.gender === "true" ? { checked: true } : {})}
                    />
                    <FormControlLabel
                      value="nu"
                      control={<Radio />}
                      label="Nữ"
                      {...(user && user.gender === "false" ? { checked: true } : {})}
                    />
                  </RadioGroup>
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#d3542a" }}
                    className="rounded-full px-10 py-2 text-white hover:bg-[#b84320]"
                    onClick={() => setOpenDialog(true)}
                  >
                    Chỉnh sửa
                  </Button>

                  <EditProfileDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    user={user}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start gap-4 border-l border-gray-300 pl-8 min-w-[180px]">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-user text-white text-3xl"></i>
                </div>
                <button
                  className="border border-gray-400 rounded-md px-4 py-1 text-sm text-black hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  Chọn ảnh
                </button>
                <p className="text-[10px] text-gray-500 text-center leading-tight">
                  Dung lượng file tối đa 1 MB
                  <br />
                  Định dạng:.JPEG, .PNG
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProfileUser;
