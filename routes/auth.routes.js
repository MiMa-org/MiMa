const { Router } = require('express');
const router = new Router();
 
router.get('/signup', (req, res) => res.render('auth/signup'));
 
// POST route ==> to process form data
 
module.exports = router;