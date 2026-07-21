const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    productInfo: String,
    color:{
        enum: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    },
    size: {
        enum: [7, 8, 9, 10, 11, 12],
    },
    price: Number,
    imgUrl: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;