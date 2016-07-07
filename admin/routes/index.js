
module.exports = function(app, passport){

	/* GET home page. */
	app.get('/', isLoggedIn, function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	app.get('/login', function(req, res){
		if (!req.isAuthenticated())
			res.render('login', {title: 'Login', message:req.flash('loginMessage')});
		else
			res.redirect('/view');
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash    : true
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}