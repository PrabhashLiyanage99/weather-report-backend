const User = require('../models/User');
const weatherService = require('../services/weatherService');

const registerUser = async(req, res) => {
    const {name, email, location } = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({messge: 'already exists'});
        };
        const weatherEntry = await weatherService.fetchWeather(location);
        const newUser = new User({ name, email, location, weatherData:[weatherEntry]});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


module.exports ={
    registerUser,
}