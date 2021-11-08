const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    },


}, { timestamps: true });

module.exports = model('Post', postSchema);
