const axios = require('axios');
const User = require('../models/User');

const API_KEY = process.env.WEATHER_API_KEY;

const fetchWeather = async(location) => {

    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    
    return {
        date: new Date(),
        temperature: data.main.temp,
        weather: data.weather[0].description
    };
};

const weatherUpdate = async ()=> {
    const users = await User.find();
    for (const user of users) {
        const {location} = user;
        try {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
            const weatherEntry = {
                date: new Date(),
                temperature: data.main.temp,
                weather: data.weather[0].description
            };
            user.weatherData.push(weatherEntry);
            await user.save();
        }catch (err) {
            console.error("Fetching Error",err.message);
        }
    }
};

setInterval(weatherUpdate, 3*60*60*1000);

module.exports={
    fetchWeather
}