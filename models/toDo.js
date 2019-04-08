const mongoose = require('mongoose')
const Schema = mongoose.Schema
const toDoSchema = new Schema({
    name:{
        type: String,
        requires:''
    },
    title:{
        type: String,    
    },
    id:{
        type: String
    },
    color:{
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }

})


module.exports = mongoose.model('toDo', toDoSchema)