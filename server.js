const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// Initial balance
let userBalance = 5;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to get balance for a specific address (using mock balance here)
app.get('/get-balance', (req, res) => {
    res.json({ balance: userBalance });
});

// Route to handle coin flip
app.post('/flip-coin', async (req, res) => {
    const { amount, side } = req.body;

    if (userBalance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Simulate a coin flip
    const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
    let newBalance = userBalance;

    if (coinResult === side) {
        // User wins, double the amount
        newBalance += amount;
    } else {
        // User loses, deduct the amount
        newBalance -= amount;
    }

    userBalance = newBalance;

    res.json({ txId: 'mock_tx_id', coinResult, newBalance });
});

// Route to handle watching an ad
app.post('/watch-ad', async (req, res) => {
    // Simulate earning 2 BTC by watching an ad
    userBalance += 2;
    res.json({ newBalance: userBalance });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
