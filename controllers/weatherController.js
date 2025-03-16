const weatherService = require('../services/weatherService');

const setWeather = async(req, res) => {
    try{
        const city = req.query.city || 'New York';
        const weatherData = await weatherService.fetchWeather(city);
        res.json(weatherData);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


module.exports={
    setWeather
}