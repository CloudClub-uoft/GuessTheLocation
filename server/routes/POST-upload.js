module.exports = (app, s3Client) => {
  app.post("/postupload", (req, res) => {
    console.log("upload")
    var file;
    var fileExtension;
    console.log(req.files);

    // React axios upload
    file = req.files.file

    // EJS (property is called "image" instead of "file")
    // file = req.files.image;

    fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3Client.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("\nUploaded Object:\n", data);
      }
    });
	res.send({});
  });
};
