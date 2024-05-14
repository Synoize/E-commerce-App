const { uniq } = require('lodash');
const mongoose = require('mongoose')

//define the student sehema
const personSchema = new mongoose.Schema({
    //Shoping Item's Category 
    id:{
        type:Number,
        default:0
    },

    name:{
        type :String,
        required:true
       
    },

    work:{
        type: String,
        enum: ['employee', 'manager'], 
        require:true
    },

    mobile:{
        type: Number,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    selary:{
        type:Number,
        required:true,

    }
})

//Create Student model
const person = mongoose.model('person', personSchema)
module.exports = person;
