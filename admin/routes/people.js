var peopleModel = require('../models/people');

module.exports = function(app, passport){
	/* GET people listing. */

	app.get('/people', 
			passport.authenticate('basic', { session: false }), 
			function(req, res, next) {
				peopleModel.find(function(err, people) {
		    		if(err) res.send(500, err.message);
		    			console.log('GET /people')
					res.status(200).jsonp(people);
			})
	  //res.send('people');
	});

	/*Find by email*/
	app.get('/people/:email', 
			passport.authenticate('basic', { session: false }),
			function(req, res, next){
				console.log('GET ', req.params.email);
				peopleModel.findOne({'email':req.params.email}, function(err, person){
				if (err)
					res.send(500, err.message);
					res.status(200).jsonp(person);
				})
	});

	/*Create a new person*/
	app.post('/people', 
			passport.authenticate('basic', { session: false }),
			function(req, res, next){
				console.log('POST');
				var person = new peopleModel({
					email: req.body.email,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					school: req.body.school,
					photos: [],
					updatedAt: Date.now
				});
				person.save(function(err, pers){
				if (err)
					return res.send(500, err.message);
				res.status(200).jsonp(pers);
			});
	});

	/*Delete a person*/
	app.delete('/people/:email', 
			passport.authenticate('basic', { session: false }), 
			function(req, res, next){
				console.log('DELETE ', req.params.email);
				peopleModel.remove({'email': req.params.email}, function(err, pers){
					if (err)
						return res.send(500, err.message);
					res.status(200).jsonp(pers);
				})
	});

	/*Update a person*/
	app.put('/people/:email', 
			passport.authenticate('basic', { session: false }), 
			function(req, res, next){
				console.log('UPDATE ', req.params.email);
				var newPerson = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					school: req.body.school,
					photos: req.body.photos
				};
				peopleModel.update({'email': req.params.email}, newPerson, function(err, pers){
				if (err)
					return res.send(500, err.message);
				res.status(200).jsonp(pers);
			})
	});
}