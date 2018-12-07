const mongoose = require('mongoose');

 
const userSchema = mongoose.Schema({
    bucket:{
        type:String,

    },
    time:{
        type:String,

    },
    link:{
        type:String
    }
})


const Mong = mongoose.model('Mong', userSchema )

module.exports = { Mong }