const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        nama : {
            type: String,
           
        },
        telepon : {
            type: Number,
        }
    },
    {
        timestamps: true
    }

)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;