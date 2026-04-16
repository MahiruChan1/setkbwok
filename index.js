const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Tempat nyimpen status sementara di memori server
let diceStatus = { mode: "normal" };

// Endpoint untuk UserScript (BACA DATA)
app.get('/status', (req, res) => {
    res.json(diceStatus);
});

// Endpoint untuk Bot Telegram Termux (TULIS DATA)
app.get('/set-status', (req, res) => {
    const newMode = req.query.mode;
    if (newMode === 'b' || newMode === 'k' || newMode === 'normal') {
        diceStatus.mode = newMode;
        res.send(`Status berhasil diubah ke: ${newMode}`);
    } else {
        res.status(400).send("Mode salah, anjing!");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server C.R On di port ${PORT}`));
