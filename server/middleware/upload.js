import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
dotenv.config();

// This creates an S3 client
const s3Client = new S3Client({
  region: process.env.AWS_ACCOUNT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCOUNT_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCOUNT_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (file, folderName, id) => {
  console.log(file, folderName, id);
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folderName}/${id}/${file.originalname}`,
      Body: file.buffer,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Failed to upload file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};
