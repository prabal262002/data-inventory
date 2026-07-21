const monggose = require('mongoose');

const todoSchema = new monggose.Schema({
    title: {
        type: String,
        required: true},
    description: String,
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],},
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false},
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now},
    updatedAt: {
        type: Date,
        default: Date.now},
},
{timestamps: true});

const Todo = monggose.model('Todo', todoSchema);
module.exports = Todo;