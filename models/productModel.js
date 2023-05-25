const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: false,
        },
        quantity : {
            type: Number,
            required: false,
            
        },
        price : {
            type: Number,
            required: false,
        },
        image : {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }

)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;