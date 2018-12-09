const mongoose = require('mongoose');

 
const userSchema = mongoose.Schema({
    Bucket:{
        type:String,

    },
    Date:{
        type:String,

    },
    Time:{
        type:String,

    },
    Link:{
        type:String
    }
})


const Mong = mongoose.model('Mong', userSchema )

module.exports = { Mong }