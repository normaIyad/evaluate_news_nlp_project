const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist'))); // Ensure this path is correct

// Debug environment variable
if (!process.env.MEANINGCLOUD_API_KEY) {
    console.error("API key is not defined! Check your .env file.");
    process.exit(1); // Exit the server if API key is missing
} else {
    console.log(`Your API key is: ${process.env.MEANINGCLOUD_API_KEY}`);
}

// Serve the main index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html')); // Ensure this path is correct
});

// API route to handle MeaningCloud requests
app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const apiKey = process.env.MEANINGCLOUD_API_KEY;
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${url}&lang=en`;

    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from MeaningCloud' });
    }
});

// Start the server
const PORT = 9002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`http://localhost:${PORT}`);
});
