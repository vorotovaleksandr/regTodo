const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
    email:{
        type: String,
        unique: true
            },
    password:{
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
