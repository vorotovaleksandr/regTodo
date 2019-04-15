const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    title: {
        type: String,
    },
    color: {
        type: String
    },
    id: {
        type: String
    },
    userId: {
        type: String
    }

})

module.exports = mongoose.model('toDos', toDoSchema)