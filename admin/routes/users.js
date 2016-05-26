var userModel = require('../models/user');

module.exports = function(app, passport){

//TODO: Allow just admin users to use this API
	/* GET users listing. */
	app.get('/users', 
		passport.authenticate('basic-admin', { session: false }),
		function(req, res, next) {
			userModel.find(function(err, users) {
			    if(err) res.send(500, err.message);
			    	console.log('GET /users')
				res.status(200).jsonp(users);
		})
	});

	/*app.post('/signup', passport.authenticate('local-signup', {
    	successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	*/
	app.post('/users', 
			passport.authenticate('basic-admin', { session: false }),
			function(req, res, next){
				console.log('POST');
				console.log(userModel);
				var user = new userModel();
                user.email    = req.body.email;
                user.password = user.generateHash(req.body.password);
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.school = req.body.school;
                user.role = req.body.role;
								
				user.save(function(err, pers){
				if (err)
					return res.send(500, err.message);
				res.status(200).jsonp(pers);
				});
	});

}