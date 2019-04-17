const toDo = require('../models/to-do')
const errorHandler = require('../routes/utils/error-handler')

module.exports.getAll = async (req, res) => {
  try {
    const todo = await toDo.find({
      userId: req.session.userId
    })
    res.status(201).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.getById = async (req, res) => {
  try {
    const todo = await toDo.findById(req.params.id)
    res.status(200).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.remove = async (req, res) => {
  if (req.body.id) {
    try {
      await toDo.remove({
        userId: req.session.userId,
        id: req.body.id
      })
      res.status(200).json({
        message: 'to-do deleted'
      })
    } catch (e) {
      errorHandler(res, e)
    }
  } else {
    try {
      await toDo.remove({
        userId: req.session.userId
      })
      res.status(200).json({
        message: 'All to-do deleted'
      })
    } catch (e) {
      errorHandler(res, e)
    }
  }
}
module.exports.create = async (req, res) => {
  const todo = new toDo({
    title: req.body.title,
    id: req.body.id,
    color: req.body.color,
    userId: req.body.userId
  })
  try {
    await todo.save()
    res.status(201).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.update = async (req, res) => {
  const updated = {
    color: req.body.color,
  }
  try {
    const todo = await toDo.findOneAndUpdate({
      userId: req.session.userId,
      id: req.body.id
    }, {
      $set: updated
    })
    res.status(200).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.edit = async (req, res) => {
  const updated = {
    title: req.body.title,
  }
  try {
    const todo = await toDo.findOneAndUpdate({
      userId: req.session.userId,
      id: req.body.id
    }, {
      $set: updated
    })
    res.status(200).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }
}
module.exports.drop = async (req, res) => {
  req.session.destroy(function () {
    req.session = null;
    res.clearCookie('connect.sid');
  });
}