

const { trimEnd } = require('lodash');
const mongoose = require ('mongoose');

// this is the very simple schema of a product just the unit price for testing purposes
// we can also make a more sophisticated one

const ProductSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: true,
        trim: true
    },

    images: [
        {
            type: String
        }
    ],

    unitPrice: { // in Dollars
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true // TODO - we can also implement limit on the length of description and name
    }

}, { timestamps: true });


const Product = mongoose.model ('product', ProductSchema);

module.exports = {
    Product
}