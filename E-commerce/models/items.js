const mongoose = require('mongoose')
const itemsSchema = new mongoose.Schema({
    id:{
        type : Number,
        default:0
    },
    item:{
        type:String,
        require:true,
        unique:true
    },
    category:{
        type :String,
        emun: ['fashion', 'electronics', 'hardware', 'Beauty and personal care', 'Tobacco products','Toys and hobbies','Grocery'],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offer:{
        type:Number,
        default:0
    }
})

const items = mongoose.model('items', itemsSchema)
module.exports = items;