const toDo = require('../models/toDo')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req,res){
try{
    const todo = await toDo.find({user: req.user.id})
    res.status(200).json(todo)

}catch (e) {
    errorHandler(res, e)
}
}
module.exports.getById = function(req,res){
try{

}catch (e) {
    errorHandler(res, e)
}      
}
module.exports.remove = function(req,res){
try{

}catch (e) {
    errorHandler(res, e)
}      
}
module.exports.create = function(req,res){
try{

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