var userModel = require('../models/user');

module.exports = function(app, passport) {

  //TODO: Allow just admin users to use this API

  /* GET - All users */
  app.get('/users',
    passport.authenticate('basic-admin', {session: false}),
    function(req, res, next) {
      userModel.find(function(err, users) {
        if (err) {
          res.status(500).send(err.message);
        }
        console.log('GET /users');
        res.status(200).send({
          status: 200,
          data: users
        });
      });
    }
  );

  /* GET - User by email */
  app.get('/users/:email',
    passport.authenticate('basic', { session: false }),
    function(req, res, next) {
      console.log('GET ', req.params.email);
      userModel.findOne({'email':req.params.email}, function(err, person) {
        if (err) {
          res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          data: person
        });
      });
    }
  );

  /* POST - Create new user */
  app.post('/users',
    passport.authenticate('basic-admin', {session: false}),
    function(req, res, next) {
      console.log('POST');
      console.log(userModel);
      var user = new userModel();
      user.email    = req.body.email;
      user.password = user.generateHash(req.body.password);
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.school = req.body.school;
      user.role = req.body.role;
      user.save(function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Usuario agregado exitosamente',
          data: pers
        });
      });
    }
  );

  /* PUT - Update user*/
  app.put('/users/:email',
    passport.authenticate('basic', { session: false }),
    function(req, res, next) {
      console.log('UPDATE ', req.params.email);
      var user = new userModel();
      var mPassword = user.generateHash(req.body.password);
      var newUser = {
        email: req.body.email,
        password: mPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        school: req.body.school,
        role: req.body.role
      };
      userModel.update({'email': req.params.email}, newUser, function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Usuario actualizado exitosamente',
          data: newUser,
          result: pers
        });
      });
    }
  );

  /* DELETE - User by email*/
  app.delete('/users/:email',
    passport.authenticate('basic', {session: false}),
    function(req, res, next) {
      console.log('DELETE ', req.params.email);
      userModel.remove({'email': req.params.email}, function(err, pers) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(200).send({
          status: 200,
          description: 'Usuario eliminada exitosamente',
          data: pers
        });
      });
    }
  );

};
