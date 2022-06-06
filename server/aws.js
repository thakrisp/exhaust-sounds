import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

let ID = process.env.AccessKeyID;
let SECRET = process.env.SecretAccessKey;

const s3Client = new S3Client({
  region: "us-east-2",
  //forcePathStyle: true,
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});

async function uploadFile(filePath, fileName, BUCKET_NAME, ext) {
  // Read content from the file
  let location = fileName.concat(ext);
  const fileContent = readFileSync(filePath);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: location, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Success", data);
    //return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}

export default uploadFile;
