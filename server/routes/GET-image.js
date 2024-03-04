// Back-end API to retrieve an image from S3
module.exports = (app, s3Client) => {
  app.get("/getimage/:id", (req, res) => {
    var key = req.params.id;

    // s3 get request params
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };

    s3Client.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.send({});
      } else {
        console.log(`Got image: ${key}`);
        let content = data.Body; // raw data of the image
        let fileExt = key.substring(key.lastIndexOf(".") + 1); // get file suffix
        res.send({
          image: content, // send to React front-end
          fileExtenstion: fileExt,
        });
      }
    });
  });
};
