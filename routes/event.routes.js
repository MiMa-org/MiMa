const express = require('express');
const router = express.Router();
const Event = require('../models/Event.model');
const fileUploader = require('../config/cloudinary.config');

// GET route to display the form to create a new space
router.get('/events/create', (req, res) => res.render('events/newEvent'));

router.get('/events', (req, res) => {
    Event.find()
      .then(eventsFromDB => {
        res.render('events/events.hbs', { events: eventsFromDB, userInSession: req.session.currentUser });
      })
      .catch(err => console.log(`Error while getting the events from the DB: ${err}`));
  });



  // GET route for editing a space
  router.get('/events/:id/edit', (req, res) => {
    const { id } = req.params;
   
    Event.findById(id)
      .then(eventToEdit => res.render('events/event-edit', eventToEdit))
      .catch(error => console.log(`Error while getting a single event for edit: ${error}`));
  });

// POST
router.post('/events/create', fileUploader.single('event-image'), (req, res) => {
    const { title, address, date, description, artists, refreshments } = req.body;
   
    Event.create({ title, address, date, description, artists, refreshments, imageUrl: req.file.path })
      .then(newlyCreatedEventFromDB => {
        res.redirect('/events');
      })
      .catch(error => console.log(`Error while creating a new event: ${error}`));
  });

// POST route to save changes after updates in a specific space
router.post('/events/:id/edit', fileUploader.single('event-image'), (req, res) => {
    const { id } = req.params;
    const { title, address, date, description, artists, refreshments, existingImage } = req.body;
   
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
   
    Event.findByIdAndUpdate(id, { title, address, date, description, artists, refreshments, imageUrl }, { new: true })
      .then(() => res.redirect(`/events`))
      .catch(error => console.log(`Error while updating a single event: ${error}`));
  });
   

 
module.exports = router;