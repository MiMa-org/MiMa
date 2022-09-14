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

  // GET route for editing a space
  router.get('/spaces/:id/edit', (req, res) => {
    const { id } = req.params;
   
    Space.findById(id)
      .then(spaceToEdit => res.render('space-edit', spaceToEdit))
      .catch(error => console.log(`Error while getting a single space for edit: ${error}`));
  });

// POST
router.post('/spaces/create', fileUploader.single('space-image'), (req, res) => {
    const { name, address, description, website, topic, medium, offer } = req.body;
   
    Space.create({ name, address, description, website, topic, medium, offer, imageUrl: req.file.path })
      .then(newlyCreatedSpaceFromDB => {
        res.redirect('/spaces');
      })
      .catch(error => console.log(`Error while creating a new space: ${error}`));
  });

// POST route to save changes after updates in a specific space
router.post('/spaces/:id/edit', fileUploader.single('space-image'), (req, res) => {
    const { id } = req.params;
    const { name, address, description, website, topic, medium, offer, existingImage } = req.body;
   
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
   
    Space.findByIdAndUpdate(id, { name, address, description, website, topic, medium, offer, imageUrl }, { new: true })
      .then(() => res.redirect(`/spaces`))
      .catch(error => console.log(`Error while updating a single space: ${error}`));
  });
   

 
module.exports = router;