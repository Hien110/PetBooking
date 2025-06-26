import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { UserService } from '../services/userService'; 

const EditProfileDialog = ({ open, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    gender: true
  });

  useEffect(() => {
    if (user) {
        
      setFormData({
        name: user.name || '',
        address: user.address || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || true
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? value === 'true' : value
    }));
  };

  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    // Gọi API để cập nhật thông tin người dùng
    try {
      await UserService.updateUser(user._id, formData);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
    onClose(); // đóng dialog
    navigate(`/profile/${user._id}`); // chuyển hướng về trang hồ sơ
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Tên"
          name="name"
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Địa chỉ"
          name="address"
          fullWidth
          margin="dense"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          fullWidth
          margin="dense"
          value={formData.phone}
          onChange={handleChange}
        />
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          <FormControlLabel value={true} control={<Radio />} label="Nam" />
          <FormControlLabel value={false} control={<Radio />} label="Nữ" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
