var express = require('express');
var router = express.Router();

var peopleModel = require('../models/people');

/* GET people listing. */
router.get('/', function(req, res, next) {
	peopleModel.find(function(err, people) {
	    if(err) res.send(500, err.message);
	    	console.log('GET /people')
		res.status(200).jsonp(people);
	})
  //res.send('people');
});

/*Find by email*/
router.get('/:email', function(req, res, next){
	console.log('GET ', req.params.email);
	peopleModel.findOne({'email':req.params.email}, function(err, person){
		if (err)
			res.send(500, err.message);
		res.status(200).jsonp(person);
	})
});

/*Create a new person*/
router.post('/', function(req, res, next){
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
router.delete('/:email', function(req, res, next){
	console.log('DELETE ', req.params.email);
	peopleModel.remove({'email': req.params.email}, function(err, pers){
		if (err)
			return res.send(500, err.message);
		res.status(200).jsonp(pers);
	})
});

/*Update a person*/
router.put('/:email', function(req, res, next){
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


module.exports = router;
