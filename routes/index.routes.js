const router = require("express").Router();
const Event = require('../models/Event.model');

/* GET home page */

router.get('/', (req, res) => {
  Event.find()
    .then(eventsFromDB => {
      console.log("events: ", eventsFromDB)
      res.render('index.hbs', { events: eventsFromDB });
    })
    .catch(err => console.log(`Error while getting the events from the DB: ${err}`));
});


module.exports = router;
