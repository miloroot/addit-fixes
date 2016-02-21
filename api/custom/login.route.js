module.exports = function(mongoose) {
	var config = require(process.cwd() + '/config');
    var sha256 = require('sha256');

	return function(req, res) {
		if(req.method == "GET") {
			if(req.session.user) {
				res.json(req.session.user);
				console.log("User logged in: ", req.session.user.username);
			} else {
				res.json(false);
			}
		} else if(req.method == "POST") {
			if(!req.body.username || !req.body.password) {
				res.json(false);
				return;
			}

			// encrypt password
			req.body.password = sha256(config.hashSalt + req.body.password);

			mongoose.model("User").findOne(req.body, function(err, data) {
				if(err) {
					throw err;
				}

				// we never store the password
				data && (data.password = undefined);

				// store the other info in session
				data && (req.session.user = data);

				// return the logged in user if there is one
				res.json(data ? data : false);
			});
		} else if(req.method == "DELETE") {
			req.session.destroy(function(err) {
				if(err) {
					throw err;
				}
				res.json(true);
			});
		} else {
			res.json({error: "Method not allowed"});
		}
	};
};