const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
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