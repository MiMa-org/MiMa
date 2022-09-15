const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

// controllare se vogliamo mettere altro al posto di User
const User = require('../models/User.model');


 
router.get('/signup', (req, res) => res.render('auth/signup'));
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/select', (req, res) => res.render('auth/select'));
 
//-----------------------              LOGIN      -----------------------------------

// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
    console.log('SESSION =====> ', req.session);
    const { email, password } = req.body;
   
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
          return;
        } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        //   res.render('users/user-profile', { user });
        //res.render('index', {user});
        
        req.session.currentUser = user;
        res.render('index', { userInSession: req.session.currentUser });

        //req.session.currentUser = user;
        //res.redirect('/index');


        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error));
  });
 

//-----------------              SIGN UP           ---------------------------------

// POST signup route ==> to process form data
router.post('/signup', (req, res, next) => {
  // console.log("The form data: ", req.body);
 
  const { role, username, email, password } = req.body;
 
  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      role,  
      // username: username
      username,
      email,
      // passwordHash => this is the key from the User model
      //     ^
      //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
      passwordHash: hashedPassword
    });
  })
  .then(userFromDB => {
    // console.log('Newly created user is: ', userFromDB);
    // res.redirect('/userProfile');
    res.redirect('/');

   

  })
  .catch(error => next(error));
});

// per adesso l'utente registrato va solo a userProfile, pagina di prova
//router.get('/index', (req, res) => res.redirect('index'));


 
module.exports = router;