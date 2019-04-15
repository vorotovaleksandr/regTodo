const express = require('express');
const controller = require('../controllers/toDo')
const router = express.Router()
// localhost:5000/api/toDo
router.get('/',  function (req, res) {
    if (req.session.userId) {        
        res.render('toDo' )
    } else {
        res.status(403).send('Access Denied!');
    };
});
router.patch('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
// router.patch('/:id', controller.update)

module.exports = router