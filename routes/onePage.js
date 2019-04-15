const express = require('express');
const router = express.Router()
// localhost:5000
router.get('/', function (req, res) {
    res.render('onePage');
})
module.exports = router