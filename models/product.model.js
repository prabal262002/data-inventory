const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    productInfo: String,
    color:{
        type: String,
        enum: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    },
    size: {
         type: String,
        enum: [7, 8, 9, 10, 11, 12],
    },
    price: Number,
    imgUrl: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;