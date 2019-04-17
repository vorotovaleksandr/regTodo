const express = require('express');
const router = express.Router();
// localhost:5000
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/api/to-do');
  } else {
    res.render('one-page')
  };
})
module.exports = router