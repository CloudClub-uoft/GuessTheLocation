const connection = require('../config/db.js');

const insert_coords = (req,res)=>{
    sql = "INSERT INTO guess_attempt (locationLatGuess,locationLongGuess) VALUES (?,?)";
    const values = [
      req.body.lat,
      req.body.lng
    ]
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