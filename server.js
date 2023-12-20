// server.js
const express = require('express');
const path = require('path');
const routes = require('./shared');

const app = express();
const port = 3000;

// Serve static files from the root folder
app.use('/', express.static(path.join(__dirname, '')));

// Serve static files from the 'pages' folder
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Serve static files from the 'css' folder
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the 'js' folder
app.use('/js', express.static(path.join(__dirname, 'js')));

// Handle requests to the root URL explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle requests for other HTML files
app.get('/:page', (req, res) => {
    const page = req.params.page || 'index.html';

    // Check if the requested page exists in the routes
    if (routes[page]) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.status(404).send('Page not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
