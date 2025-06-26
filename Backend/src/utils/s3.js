const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
require("dotenv").config({ path: "./.env" });

const { S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME } = process.env;

// Configure AWS
const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});

const uploadFileToS3 = async (fileName, filePath, contentType) => {
  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Body: fs.readFileSync(filePath),
        ContentType: contentType,
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });
    return await parallelUploads3.done();
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
};

exports.s3Client = s3Client;
exports.uploadFileToS3 = uploadFileToS3;
