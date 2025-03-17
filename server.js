const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const app = express();
connectDB();
require("dotenv").config();


app.use(cors());
app.use(bodyParser.json());

app.use("/api/users",userRoutes);
app.use('/api/weather',weatherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});