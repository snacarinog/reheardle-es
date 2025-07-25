const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const Song = require('./models/Songs.js'); // Importa tu modelo
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/canciones', express.static(path.join(__dirname, 'canciones')));
console.log(path)
// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/reheardle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Ruta para obtener una canción aleatoria
app.get('/api/songs/random', async (req, res) => {
  try {
    const randomSong = await Song.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomSong[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener canción aleatoria' });
  }
});

app.get('/api/songs/list', (req, res) => {
  const data = fs.readFileSync('./playlist_tracks.txt', 'utf-8');
  const lines = data.split('\n').map(l => l.trim()).filter(Boolean);
  res.json(lines); // ["Shakira - Loba", "O-Zone - Dragostea Din Tei", ...]
});

// Servir archivos estáticos desde /public/audio o /canciones

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));



