const weatherService = require('../services/weatherService');
const User = require('../models/User');

const getWeather = async(req, res) => {
    const {email, date} = req.query;
    try{
        const user = await User.findOne({email});
        if(!User){
            return res.status(404).json({message:"user not found"});
        }
        const requestedDate = new Date(date);
        
        const weather = user.weatherData.filter(entry=> 
        new Date(entry.date).toISOString().split('T')[0] === requestedDate.toISOString().split('T')[0]
        );

        if(!weather){
            return res.status(404).json({ message: "No weather data"});
        }
        const formattedWeather = weather.map(entry => ({
            time:new Date(entry.date).toISOString().split('T')[1].slice(0,5),
            temperature:entry.temperature,
            weather:entry.weather
        }));
        res.json({
            date: requestedDate.toISOString().split('T')[0],
            records:formattedWeather
        });
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

module.exports={
    getWeather
}