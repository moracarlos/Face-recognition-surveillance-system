var peopleModel = require('../models/people');

module.exports = function(app, passport) {

  /* GET - All people */
  app.get('/people',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      peopleModel.find(function(err, people) {
        if (err) {
          res.status(500).send(err.message);
        }
        console.log('GET /users');
        res.status(200).send({
          status: 200,
          data: people
        });
      });
    }
  );

  /* GET - Person by email */
  app.get('/people/:email',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      console.log('GET ', req.params.email);
      peopleModel.findOne({'email': req.params.email}, function(err, person) {
        if (err) {
          res.status(500).send(err.message);
        }
        console.log('GET /users');
        res.status(200).send({
          status: 200,
          data: person
        });
      });
    }
  );

  /* POST - Create new person */
  app.post('/people',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      console.log('POST');
      var person = new peopleModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school,
        photos: [],
        updatedAt: Date.now
      });
      person.save(function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Persona agregada exitosamente',
          data: pers
        });
      });
    }
  );

  /*Update a person*/
  app.put('/people/:email',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      console.log('UPDATE ', req.params.email);
      var newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school,
        photos: req.body.photos
      };
      peopleModel.update({'email': req.params.email}, newPerson, function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Persona actualizada exitosamente',
          data: pers
        });
      });
    }
  );

  /*DELETE - Person by email*/
  app.delete('/people/:email',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      console.log('DELETE ', req.params.email);
      peopleModel.remove({'email': req.params.email}, function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Persona eliminada exitosamente',
          data: pers
        });
      });
    }
  );

};
