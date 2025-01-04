const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Sign-Up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Log the hashed password and entered password for debugging
        console.log('Stored password: ', user.password);
        console.log('Entered password: ', password);

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'dsfgdfgdUGUYdfsklfs', // Use an environment variable for security
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});


// Protected Route (example)
router.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Protected data", user: verified });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;
