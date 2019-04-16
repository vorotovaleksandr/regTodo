const express = require('express');
const router = express.Router();
// localhost:5000
router.get('/', (req, res) => {
  res.render('onePage');
})
module.exports = router