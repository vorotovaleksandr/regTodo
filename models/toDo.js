const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    title:{
        type: String,
        required: true       
    },    
    color:{
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    id:{
        type: String
    }

})


module.exports = mongoose.model('toDos', toDoSchema)