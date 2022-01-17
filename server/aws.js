const AWS = require('aws-sdk');
const fs = require('fs');

require('dotenv').config();

let ID = process.env.AccessKeyID;
let SECRET = process.env.SecretAccessKey;

//const BUCKET_NAME = 'test-sounds';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

function uploadFile(filePath, fileName, BUCKET_NAME, ext) {
  // Read content from the file
  let location = fileName.concat(ext);
  const fileContent = fs.readFileSync(filePath);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: location, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }

    console.log(`File uploaded successfully. ${data.Location}`);
  });
}

module.exports = {
  uploadFile,
};
