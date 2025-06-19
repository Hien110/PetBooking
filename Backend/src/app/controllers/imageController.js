const Image = require("../models/Image");
const { uploadFileToS3 } = require("../../utils/s3");
const { getNameFromFullName } = require("../../utils/file");
const path = require("path");
const sharp = require("sharp");
const { formidable } = require("formidable");
const fs = require("fs");

class imageController {
  constructor() {
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  async getAllImages(req, res) {
    try {
      const images = await Image.find();
      return res.status(200).json(images);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async createImage(req, res) {
    try {
      const { url } = req.body;
      const newImage = new Image({
        url,
      });
      await newImage.save();
      return res.status(201).json(newImage);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async handleUploadImage(req) {
    const uploadDir = path.resolve("uploads/images");
    // Đảm bảo thư mục tồn tại
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadDir,
      maxFiles: 4,
      keepExtensions: true,
      maxFileSize: 10000 * 1024,
      maxTotalFileSize: 1000 * 1024 * 4,
      filter: function ({ name, originalFilename, mimetype }) {
        const valid = name === "image" && Boolean(mimetype?.includes("image/"));
        if (!valid) {
          form.emit("error", new Error("file type is not vilid"));
        }
        return valid;
      },
    });

    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("Formidable parse error:", err);
          return reject(err);
        }

        if (!files.image) {
          return reject(new Error("No file uploaded"));
        }

        // Chuyển đổi files.image thành mảng nếu chỉ có 1 file
        const fileArray = Array.isArray(files.image)
          ? files.image
          : [files.image];
        resolve(fileArray);
      });
    });
  }

  async uploadImage(req, res) {
    try {
      const files = await this.handleUploadImage(req);

      const result = await Promise.all(
        files.map(async (file) => {
          try {
            const newName = `${Date.now()}-${file.originalFilename}`;
            const newFullName = `${getNameFromFullName(
              newName
            )}.${file.originalFilename.split(".").pop()}`;
            const newPath = path.resolve("uploads/images", newFullName);

            // Kiểm tra file tạm tồn tại
            if (!fs.existsSync(file.filepath)) {
              throw new Error(`Temporary file not found: ${file.filepath}`);
            }

            // Đảm bảo thư mục đích tồn tại
            const uploadDir = path.dirname(newPath);
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Xử lý ảnh với Sharp
            await sharp(file.filepath).jpeg({ quality: 80 }).toFile(newPath);

            // Kiểm tra file đã xử lý tồn tại
            if (!fs.existsSync(newPath)) {
              throw new Error(`Processed file not found: ${newPath}`);
            }

            const upload = await uploadFileToS3(
              newFullName,
              newPath,
              file.mimetype
            );

            // Xóa file tạm sau khi upload
            try {
              if (fs.existsSync(newPath)) {
                fs.unlinkSync(newPath);
              }
            } catch (deleteError) {
              console.error("Error deleting processed file:", deleteError);
            }

            try {
              if (fs.existsSync(file.filepath)) {
                fs.unlinkSync(file.filepath);
              }
            } catch (deleteError) {
              console.error("Error deleting temp file:", deleteError);
            }

            return {
              url: upload.Location,
              name: newFullName,
              type: file.mimetype,
            };
          } catch (fileError) {
            throw fileError;
          }
        })
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
        stack: error.stack,
      });
    }
  }
}

module.exports = new imageController();
