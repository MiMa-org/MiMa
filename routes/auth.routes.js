const { Router } = require('express');
const router = new Router();


 
router.get('/signup', (req, res) => res.render('auth/signup'));

router.get('/select', (req, res) => res.render('auth/select'));


 
// POST route ==> to process form data
 
module.exports = router;