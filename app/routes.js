const express = require('express');
const router = express.Router();

// const tempTrack = require('./models/temp-track');
// const system = require('./models/system');
//
// router.use(express.static('dist'));
//
// router.get('/health', (req, res) => {
//   res.send('damn good!');
// });
//
// router.get('/system', (req, res) => {
//   system(req, res);
// });
//
// router.get('/temp-track', (req, res) => {
//   tempTrack(req, res);
// });
//
// router.get('/tv', (req, res) => {
//   if(req.query.key === config.apiKey) {
//     exec('curl http:\/\/192.168.0.27\/');
//     res.send('done');
//   } else {
//     res.send('failed');
//   }
// });

const tempController = require('./controllers/temp-controller');
const author_controller = require('./controllers/authorController');
const genre_controller = require('./controllers/genreController');
const book_instance_controller = require('./controllers/bookinstanceController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/temps', tempController.tempList);

module.exports = router;
