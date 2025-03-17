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

const updateLocation = async (req, res) => {
    const{email, location } =req.body;
    
    try{
        const weatherEntry = await weatherService.fetchWeather(location);
        const user = await User.findOneAndUpdate({email}, {location,weatherData:[weatherEntry]},{new:true});
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        res.status(201).json({message: 'updated successfully'});
    }catch(err){
        res.status(500).json({error:err.message});  
    }
};

module.exports ={
    registerUser,
    updateLocation
}