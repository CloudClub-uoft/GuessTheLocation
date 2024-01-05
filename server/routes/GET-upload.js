module.exports = (app, db) => {
    app.get("/upload", (req, res) => {
        return res.render("uploadtest");
    })
}