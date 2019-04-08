const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
    title:{
        type: String,
        unique: true
            },
    id:{
        type: String
    },
    color:{
        type: String
    },
    UserId2:{
        type: String
    }
},{
    timestamps: true
}
);
schema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('user', schema);