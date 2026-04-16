const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

let diceData = {
    pola: "n", // Default normal
    currentIndex: 0
};

app.get('/status', (req, res) => {
    res.json(diceData);
});

app.get('/set-status', (req, res) => {
    const mode = req.query.mode; // Ini nerima "b-k-b-b" dari bot
    if (mode) {
        diceData.pola = mode;
        diceData.currentIndex = 0; // Reset index tiap kali ada pola baru
        res.send("Pola berhasil di-set: " + mode);
    } else {
        res.status(400).send("Mana modenya, anjing?");
    }
});

// Tambahan: Endpoint buat geser antrean setelah dadu muncul
app.get('/next', (req, res) => {
    const p = diceData.pola.split('-');
    if (diceData.currentIndex < p.length - 1) {
        diceData.currentIndex++;
    } else {
        diceData.currentIndex = 0; // Balik ke awal kalau pola abis
    }
    res.json(diceData);
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server C.R On`));
