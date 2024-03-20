const { v4: uuidv4 } = require("uuid");

module.exports = (app, s3Client) => {
  app.post("/postupload", (req, res) => {
    var file;
    var fileExtension;

    // React axios upload
    file = req.files.file;

    // EJS (property is called "image" instead of "file")
    // file = req.files.image;

    fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

    var params = {
      Bucket: process.env.BUCKET_NAME,
      // Key: file.name,
      Key: (uuidv4() + "." + fileExtension),    // uuid key for the image
      Body: file.data,
    };
    s3Client.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Image upload failed!" });
      } else {
        console.log("\nUploaded Object:\n", data);
        res.status(200).send({ message: "Image upload successful!" });
      }
    });
  });
};
