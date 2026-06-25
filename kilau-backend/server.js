const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API untuk menjembatani data eksternal ke frontend
app.get('/api/get-financial-data', (req, res) => {
    // Simulasi data pengguna yang ditarik secara rahasia
    const userData = {
        walletAddress: "0xYourUserAddressHere",
        rawCreditScore: 750, // Skor kredit asli (tidak akan masuk blockchain)
        minimumRequired: 600 // Batas lulus dari smart contract
    };
    
    res.json(userData);
});

app.listen(port, () => {
    console.log(`Backend KILAU DeFi jalan di http://localhost:${port}`);
});