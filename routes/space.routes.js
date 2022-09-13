const express = require('express');
const router = express.Router();
 
const Space = require('../models/Space.model');

const fileUploader = require('../config/cloudinary.config');

// GET route to display the form to create a new space
router.get('/spaces/create', (req, res) => res.render('newSpace'));

router.get('/spaces', (req, res) => {
    Space.find()
      .then(spacesFromDB => {
        res.render('spaces.hbs', { spaces: spacesFromDB });
      })
      .catch(err => console.log(`Error while getting the spaces from the DB: ${err}`));
  });

// POST
router.post('/spaces/create', fileUploader.single('space-image'), (req, res) => {
    const { name, description } = req.body;
   
    Space.create({ name, description, imageUrl: req.file.path })
      .then(newlyCreatedSpaceFromDB => {
        res.redirect('/spaces');
      })
      .catch(error => console.log(`Error while creating a new space: ${error}`));
  });
   

 
module.exports = router;