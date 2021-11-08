const { Schema, model } = require('mongoose');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true,
        trim: true
    },
    posts: [{type: Schema.Types.ObjectId, ref:'Post'}]
})


module.exports = model('Author', authorSchema);
