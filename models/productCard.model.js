const mongoose = require('mongoose');

const productCardSchema = new mongoose.Schema({
    name: String,
    originalPrice: Number,
    discountedPrice: Number,
    discountPercentage: Number,
    imgUrl: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    ratingCount: Number,
    reviewsCount: Number,
    description: String,
    isFlipkartAssured: {
        type: Boolean,
        default: false
    },
    isFreeDelivery: {
        type: Boolean,
        default: false
    },
    leftInStock: {
        type: Number,
        default: 0
    }
});

const ProductCard = mongoose.model('ProductCard', productCardSchema);
module.exports = ProductCard;