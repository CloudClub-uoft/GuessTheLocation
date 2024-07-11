const db = require('../config/db.js');
const haversine = require('haversine');

const insert_coords = (req, res) => {
	sql = "INSERT INTO guess_attempt (locationLatGuess,locationLongGuess) VALUES (?,?)";
	const values = [
		req.body.lat,
		req.body.lng
	]
	db.query(sql, values, (err, result) => {
		if (err) {
			return res.json({ messsage: 'Something unexpected has occured' + err });
		}
		else {
			return res.json({ success: "Coordinates added successfully" });
		}
	})
};

const processGuess = (req, res) => {
	// Calculate score and insert into table as well?
	var post_id = 100;	// for testing since post_id has not been implemented in guess page, (toronto coordinates)

	// Get actual coordinates from database
	db.query(`SELECT locationLat, locationLong FROM post WHERE postID = ${post_id}`, (err, results) => {
		if (err) {
			res.status(500).send({ message: "Failed getting location data" });
		}
		else {
			// Calculate distance & score
			const dist = calculateDistance(req.body.lat, req.body.lng, results[0].locationLat, results[0].locationLong);
			const score = calculateScore(dist);
			res.status(200).send({ distance: dist, score: score });
		}
	})
}

const calculateDistance = (guessLat, guessLon, actualLat, actualLon) => {
	const guess = {
		latitude: guessLat,
		longitude: guessLon
	};

	const actual = {
		latitude: actualLat,
		longitude: actualLon
	};
	return (haversine(guess, actual));	// Distance calculated using haversine library
}

// calculateDistance(100, 49.260884, -123.1139209);		// testing

const calculateScore = (dist) => {
	const maxScore = 5000;
	const maxDiagonalDist = 15000;	// Distance of smallest rectangle containing entire map
	return maxScore * Math.exp(-10 * dist / maxDiagonalDist);
}

module.exports = {
	insert_coords,
	processGuess
}