const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true,
         unique: true
    },
    location: {
        type: String,
        required: true
    },
    weatherData:[
        {
        date:{
            type:Date,
            required:true
        },
        temperature: Number,
        weather: String
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);