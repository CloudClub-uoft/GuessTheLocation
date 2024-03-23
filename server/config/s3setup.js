const AWS = require("aws-sdk");

AWS.config.credentials = {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
};

const s3Client = new AWS.S3({
    computeChecksums: true
});

module.exports = s3Client