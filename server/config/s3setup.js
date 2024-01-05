const AWS = require("aws-sdk");

// console.log(process.env.BUCKET_NAME)

AWS.config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
};

const s3Client = new AWS.S3({
    computeChecksums: true
});

var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "test",
    Body: "Hello world",
};

/*
s3Client.upload(params, function (err, data) {
    if (err) {
        console.log(err);
    }
    else
        console.log("\nUploaded Object:\n", data);
})
*/

module.exports = s3Client