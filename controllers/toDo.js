const toDo = require('../models/toDo')
const errorHandler = require('../routes/utils/errorHandler')



module.exports.getAll = async function(req,res){
    
    
try{
    
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
module.exports.create = async function(req, res){  
    
    console.log('req.body', req.body)
const todo = new toDo({
 title: req.body.title,
 id: req.body.id, 
 color: req.body.color, 
 userId: req.body.userId
})
try{
    
    await todo.save()
    res.status(201).json(todo)

} catch (e) {
 errorHandler(res, e)
}     
}
module.exports.update = async function(req,res){
const updated = {
    title: req.body.title,
    color: req.body.color

}    
try{
    const todo = await toDo.findOneAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
    )
    res.status(200).json(todo) 

}catch (e) {
    errorHandler(res, e)
}      
}