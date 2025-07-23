// server/importSongs.js
const fs = require('fs');
const mongoose = require('mongoose');
const Song = require('./models/Songs');
const connectDB = require('./database');

const importSongs = async () => {
  try {
    await connectDB();

    const data = fs.readFileSync('./canciones.json', 'utf-8');
    const songs = JSON.parse(data);

    const withFullName = songs.map(song => ({
      ...song,
      fullName: `${song.artist} - ${song.title}`
    }));

    await Song.insertMany(withFullName);
    console.log(`✅ ${songs.length} canciones insertadas correctamente`);
    process.exit();
  } catch (err) {
    console.error('❌ Error al insertar canciones:', err);
    process.exit(1);
  }
};

importSongs();