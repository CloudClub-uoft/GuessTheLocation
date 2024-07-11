const db = require('../config/db.js');
const haversine = require('haversine');

const insert_coords = (req,res)=>{
	// Calculate score and insert into table as well?
    sql = "INSERT INTO guess_attempt (locationLatGuess,locationLongGuess) VALUES (?,?)";
    const values = [
      req.body.lat,
      req.body.lng
    ]
    db.query(sql,values,(err,result)=>{
      if (err){
        return res.json({messsage: 'Something unexpected has occured' + err});
      }
      else{
        return res.json({success: "Coordinates added successfully"});
      }
    })
};

const calculateDistance = (post_id, guessLat, guessLon) => {
	// Get actual coordinates from database
	db.query(`SELECT locationLat, locationLong FROM post WHERE postID = ${post_id}`, (err, results) => {
		if (err) {
			return -1
		}
		else {
			const guess = {
				latitude: guessLat,
				longitude: guessLon
			};

			const actual = {
				latitude: results[0].locationLat,
				longitude: results[0].locationLong
			};
			return(haversine(guess,actual));	// Distance calculated using haversine library
		}
	})
}

// calculateDistance(100, 49.260884, -123.1139209);		// testing

const calculateScore = (dist) => {
	dist = 3358.6824497894086;
	const maxScore = 5000;
    const maxDiagonalDist = 15000;	// Distance of smallest rectangle containing entire map
    return maxScore * Math.exp(-10*dist/maxDiagonalDist);
}

module.exports = {
    insert_coords
}