import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UserService } from "../services/userService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default là customer
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(role, fullname, email, password);
      await UserService.register(fullname, email, password, role);
      navigate("/verify", { state: { email } });
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FFF] p-4">
      <div className="bg-white w-full max-w-5xl h-[600px] flex shadow-2xl overflow-hidden">
        <div className="flex-1">
          <img
            src="https://storage.googleapis.com/a1aa/image/f14b8c57-4009-40cf-05bc-6871b0b813c5.jpg"
            alt="Pet"
            className="w-full h-full object-cover object-center rounded-tr-[40px] rounded-br-[40px]"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-12 py-8">
          <h1 className="text-[32px] font-extrabold text-[#2a2e83] mb-6">
            Đăng ký
          </h1>

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Vai trò */}
            <FormControl fullWidth sx={{ mb: 2, borderColor: "#c56a38" }}>
              <InputLabel id="role-label" sx={{ color: "#2a2e83" }}>
                Vai trò
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Vai trò"
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  color: "#2a2e83",
                  borderRadius: "12px",
                  borderColor: "#c56a38",
                }}
              >
                <MenuItem value="customer">Khách hàng</MenuItem>
                <MenuItem value="shop">Cửa hàng</MenuItem>
              </Select>
            </FormControl>

            {/* Họ tên hoặc Tên cửa hàng */}
            <label
              className="block text-[#2a2e83] text-sm font-medium mb-1"
              htmlFor="fullname"
            >
              {role === "customer" ? "Họ và Tên" : "Tên cửa hàng"}
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border border-[#c56a38] rounded-xl py-3 px-5 mb-4 text-[#2a2e83] text-base outline-none"
            />

            {/* Email */}
            <label
              className="block text-[#2a2e83] text-sm font-medium mb-1"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#c56a38] rounded-xl py-3 px-5 mb-4 text-[#2a2e83] text-base outline-none"
            />

            {/* Mật khẩu */}
            <label
              className="block text-[#2a2e83] text-sm font-medium mb-1"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <div className="relative mb-4">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length < 6) {
                    setErrorMsg("Mật khẩu phải có ít nhất 6 ký tự.");
                  } else {
                    setErrorMsg("");
                  }
                }}
                className="w-full border border-[#c56a38] rounded-xl py-3 px-5 pr-12 text-[#2a2e83] text-base outline-none"
              />
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute right-4 top-1/2 -translate-y-1/2 text-[#c56a38] text-lg cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {/* Đã có tài khoản */}
            <div className="mb-4 flex items-center justify-between text-sm text-[#2a2e83]">
              <div>
                Bạn đã có tài khoản?{" "}
                <a className="font-semibold text-[#c56a38]" href="/login">
                  Đăng nhập
                </a>
              </div>
              <a className="underline" href="#">
                Quên mật khẩu?
              </a>
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              disabled={password.length < 6}
              sx={{
                mt: 1,
                py: 1.5,
                px: 6,
                borderRadius: "9999px",
                backgroundColor: "#c56a38",
                fontSize: "1rem",
                textTransform: "none",
                width: "100%",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#a8542d" },
              }}
            >
              Đăng ký
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
