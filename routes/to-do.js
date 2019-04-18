const express = require('express');
const controller = require('../controllers/to-do');
const router = express.Router();
// localhost:5000/api/to-do
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.render('to-do');
  } else {
    res.redirect('auth/login')
  };
});
router.get('/all', controller.getAll);
router.put('/remove', controller.remove);
router.post('/', controller.create);
router.patch('/', controller.update);
router.put('/edit', controller.edit);
router.put('/drop', controller.drop);


module.exports = router