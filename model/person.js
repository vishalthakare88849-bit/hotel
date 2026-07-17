const mongoose = require('mongoose');

//defines the person schema
const personSchema = new mongoose.Schema({

    name:{
        type: String,
        require : true
    },
    age:{
        type: Number,
        require : true
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        require : true,

    },
    email:{
        type: String,
        require : true,
        unique : true
    }, 
    mobile:{
        type: String,
        require : true,
        unique : true
    }, 
    address:{
        type: String,
        require : true
    },
    salary:{
        type: Number,
        require : true
    }
})

//create person schema
const person = mongoose.model('person',personSchema);
module.exports = person;






