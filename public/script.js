document.getElementById('connectWallet').addEventListener('click', async () => {
    // Placeholder for actual wallet connection logic
    alert('Wallet connected!');
    document.getElementById('game').style.display = 'block';
    checkBalance(); // Fetch balance when wallet is connected
});

async function checkBalance() {
    try {
        const response = await fetch('/get-balance');
        const data = await response.json();

        if (data.balance !== undefined) {
            document.getElementById('balance').innerText = `${data.balance} BTC`;
            if (data.balance >= 10) {
                triggerCoinFallAnimation(); // Trigger animation if balance is 10 BTC or more
            }
        } else {
            document.getElementById('balance').innerText = 'Error fetching balance.';
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        document.getElementById('balance').innerText = 'Error fetching balance.';
    }
}

document.getElementById('flipCoin').addEventListener('click', async () => {
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    const betSide = document.getElementById('betSide').value;

    if (isNaN(betAmount) || betAmount <= 0) {
        document.getElementById('result').innerText = 'Please enter a valid bet amount.';
        return;
    }

    try {
        const response = await fetch('/flip-coin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: betAmount, side: betSide }),
        });

        const data = await response.json();

        if (data.txId) {
            document.getElementById('result').innerText = `Coin landed on: ${data.coinResult}. Transaction ID: ${data.txId}`;
            checkBalance(); // Update balance after the transaction
        } else {
            document.getElementById('result').innerText = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error('Error processing transaction:', error);
        document.getElementById('result').innerText = 'Error processing transaction.';
    }
});

function triggerCoinFallAnimation() {
    const fallingCoins = document.querySelector('.falling-coins');
    fallingCoins.style.display = 'block'; // Make the falling coins visible

    // Animate falling coins
    fallingCoins.classList.add('falling');
    
    // Remove animation after it's done
    setTimeout(() => {
        fallingCoins.classList.remove('falling');
        fallingCoins.style.display = 'none'; // Hide the falling coins again
    }, 3000); // Adjust time according to animation duration
}
