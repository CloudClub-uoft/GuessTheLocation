// Back-end API to retrieve an image from S3
module.exports = (app, s3Client) => {
  app.get("/getimage", (req, res) => {
    // var image;
    var filename = req.query.key;

    // s3 get request params
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
    };

    s3Client.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.send({});
      } else {
        console.log("Got image: " + req.query.key);
        let content = data.Body; // raw data of the image
        let fileExt = filename.substring(filename.lastIndexOf(".") + 1); // get file suffix
        res.send({
          image: content, // send to React front-end
          fileExtenstion: fileExt,
        });
      }
    });
  });
};
