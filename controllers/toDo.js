const toDo = require('../models/toDo')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req,res){
try{
    const todo = await toDo.find({user: req.user.id})
    res.status(200).json(todo)

} catch (e) {
    errorHandler(res, e)
}
}
module.exports.getById = async function(req,res){
try{
    const todo = await toDo.findById(req.params.id)
    res.status(200).json(todo)
}catch (e) {
    errorHandler(res, e)
}      
}
module.exports.remove = async function(req,res){
try{
    await toDo.remove({_id: req.params.id})
    res.status(200).json({
        message: 'to-do deleted'
    })

}catch (e) {
    errorHandler(res, e)
}      
}
module.exports.create = function(req,res){
const todo = new toDo({
 user: req.user.id,
 color: req.body.color,
 title: req.body.title,
 id: req.body.id

})
try{
    await toDo.save()
    res.status(201).json

}catch (e) {
    errorHandler(res, e)
}     
}
module.exports.update = function(req,res){
try{

}catch (e) {
    errorHandler(res, e)
}      
}