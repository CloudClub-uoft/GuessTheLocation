const connection = require('../config/db.js');

const insert_coords = (req,res)=>{
    sql = "INSERT INTO guess_attempt (locationLatGuess,locationLongGuess) VALUES (?,?)";
    console.log("got here in guess.js")
    const values = [
      req.body.lat,
      req.body.lng
    ]
    console.log(res.body)
    console.log(req.body);
    connection.query(sql,values,(err,result)=>{
      if (err){
        return res.json({messsage: 'Something unexpected has occured' + err});
      }
      else{
        return res.json({success: "Coordinates added successfully"});
      }
    })
};

module.exports = {
    insert_coords
}