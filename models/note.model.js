const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: String,
    category: {
         type: String,
        enum: ['personal', 'work', 'study', 'ideas' ,'journal','other'],
    },
    tags: [String],
},
{timestamps: true});

const Note = mongoose.model('Note', noteSchema); 
module.exports = Note;