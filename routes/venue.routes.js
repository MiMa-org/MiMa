const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue.model');
const fileUploader = require('../config/cloudinary.config');

// GET route to display the form to create a new space
router.get('/venues/create', (req, res) => res.render('venues/newVenue'));

router.get('/venues', (req, res) => {
    Venue.find()
      .then(venuesFromDB => {
        res.render('venues/venues.hbs', { venues: venuesFromDB });
      })
      .catch(err => console.log(`Error while getting the venues from the DB: ${err}`));
  });

  // GET route for editing a space
  router.get('/venues/:id/edit', (req, res) => {
    const { id } = req.params;
   
    Venue.findById(id)
      .then(venueToEdit => res.render('venues/venue-edit', venueToEdit))
      .catch(error => console.log(`Error while getting a single venue for edit: ${error}`));
  });

// POST
router.post('/venues/create', fileUploader.single('venue-image'), (req, res) => {
    const { name, address, description, website, topic, medium, offer } = req.body;
   
    Venue.create({ name, address, description, website, topic, medium, offer, imageUrl: req.file.path })
      .then(newlyCreatedVenueFromDB => {
        res.redirect('/venues');
      })
      .catch(error => console.log(`Error while creating a new venue: ${error}`));
  });

// POST route to save changes after updates in a specific space
router.post('/venues/:id/edit', fileUploader.single('venue-image'), (req, res) => {
    const { id } = req.params;
    const { name, address, description, website, topic, medium, offer, existingImage } = req.body;
   
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
   
    Venue.findByIdAndUpdate(id, { name, address, description, website, topic, medium, offer, imageUrl }, { new: true })
      .then(() => res.redirect(`/venues`))
      .catch(error => console.log(`Error while updating a single venue: ${error}`));
  });
   

 
module.exports = router;