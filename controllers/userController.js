const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async(req, res) => {
    const {name, email, password } = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({messge: 'already exists'});
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email,password: hashedPassword});

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const getUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
};

module.exports ={
    registerUser,
    getUsers
}