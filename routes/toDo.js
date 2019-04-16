const express = require('express');
const controller = require('../controllers/toDo');
const router = express.Router();
// localhost:5000/api/toDo
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.render('toDo');
  } else {
    res.status(403).send('Access Denied!');
  };
});
router.get('/all', controller.getAll);
router.put('/remove', controller.remove);
router.post('/', controller.create);
router.patch('/', controller.update);

module.exports = router