const mongoose = require('mongoose');

const fruitsSchema =  new mongoose.Schema({
    name: String,
    description: String,
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fat: Number,
    imgUrl: String,
    isLiked: {
        type: Boolean,
        default: false
    },
});

const Fruits = mongoose.model('Fruits', fruitsSchema);
module.exports = Fruits;
