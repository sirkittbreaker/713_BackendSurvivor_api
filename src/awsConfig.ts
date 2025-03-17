import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const endpoint = process.env.SUPABASE_ENDPOINT_URL;
const region = process.env.AWS_REGION;
if (!accessKeyId || !secretAccessKey || !endpoint || !region) {
  throw new Error(
    "Missing required environment variables for AWS S3 configuration"
  );
}

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  endpoint,
  region,
  forcePathStyle: true,
});

export default s3Client;
