module.exports = (app, s3Client) => {
  app.post("/postupload", (req, res) => {
    var file;
    var fileExtension;
    // console.log(req.files);

    // React axios upload
    file = req.files.file

    // EJS (property is called "image" instead of "file")
    // file = req.files.image;

    fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1);

    var params = {
      Bucket: process.env.BUCKET_NAME,
      // Key: "test" + "." + fileExtension,
      Key: file.name,
      Body: file.data,
    };
    s3Client.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        /*
                return res
                    .status(500)
                    .json({ error: "Internal Server Error 500" })
                */
      } else {
        console.log("\nUploaded Object:\n", data);
        res.render("uploaddone"); // EJS
      }
    });
  });
};
