// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import required modules
const express = require('express');  // Express.js for handling HTTP requests
const WebSocket = require('ws');     // WebSocket for real-time communication
const cors = require('cors');        // CORS middleware to enable cross-origin requests

// Create an Express application instance
const app = express();

// Use CORS middleware to allow cross-origin requests to the server
app.use(cors());

// Define the port from environment variables or fallback to 5000 if not defined
const PORT = process.env.PORT || 5000;

// Define Coinbase WebSocket URL from environment variables
const COINBASE_WS_URL = process.env.COINBASE_WS_URL;

// Start the Express server and log a message when it's running
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Create a new WebSocket server using the Express HTTP server
const wss = new WebSocket.Server({ server });

// Listen for WebSocket connections from clients
wss.on('connection', (clientWs) => {
    console.log('Client connected');

    // Create a WebSocket connection to the Coinbase WebSocket feed
    const coinbaseWs = new WebSocket(COINBASE_WS_URL);

    // Listen for incoming messages from the client WebSocket
    clientWs.on('message', (message) => {
        const request = JSON.parse(message);  // Parse the incoming message from the client

        // If the client sends a 'subscribe' message, subscribe to the requested product channels
        if (request.type === 'subscribe') {
            coinbaseWs.send(JSON.stringify({
                type: 'subscribe',
                product_ids: request.product_ids,  // Get the product ids from the client request
                channels: ['level2', 'matches']   // Subscribe to 'level2' and 'matches' channels
            }));
        }
        // If the client sends an 'unsubscribe' message, unsubscribe from the requested product channels
        else if (request.type === 'unsubscribe') {
            coinbaseWs.send(JSON.stringify({
                type: 'unsubscribe',
                product_ids: request.product_ids,  // Get the product ids from the client request
                channels: ['level2', 'matches']   // Unsubscribe from 'level2' and 'matches' channels
            }));
        }
    });

    // Listen for incoming messages from the Coinbase WebSocket feed and forward them to the client
    coinbaseWs.on('message', (data) => {
        clientWs.send(data);  // Send the data received from Coinbase to the connected client
    });

    // When the client WebSocket disconnects, close the connection to the Coinbase WebSocket
    clientWs.on('close', () => {
        console.log('Client disconnected');
        coinbaseWs.close();  // Close the connection to Coinbase when the client disconnects
    });

    // When the Coinbase WebSocket closes, log that the connection has been closed
    coinbaseWs.on('close', () => {
        console.log('Coinbase WebSocket disconnected');
    });
});

// Create a new WebSocket connection to the Coinbase WebSocket feed for subscribing to market data
const ws = new WebSocket(COINBASE_WS_URL);

// Once the WebSocket connection is open, subscribe to the specified product pairs and channels
ws.on('open', function open() {
    console.log('WebSocket connected');

    // Define the subscription message to subscribe to 'level2' and 'matches' channels for multiple products
    const subscribeMessage = {
        type: 'subscribe',
        product_ids: ['BTC-USD', 'ETH-USD', 'XRP-USD', 'LTC-USD'],  // List of product pairs
        channels: ['level2', 'matches']  // Channels to subscribe to for market data
    };

    // Send the subscription message to Coinbase WebSocket
    ws.send(JSON.stringify(subscribeMessage));
});

// Listen for incoming messages from the Coinbase WebSocket and log them
ws.on('message', function incoming(data) {
    console.log('Data received: ', data);  // Log data received from the Coinbase WebSocket feed
});
