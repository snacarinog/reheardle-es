const express = require('express');
const router = express.Router();
const Song = require('../models/Songs');

router.post('/', async (req, res) => {
  try {
    const { artist, title, audioPath } = req.body;
    const fullName = `${artist} - ${title}`;

    const newSong = new Song({ artist, title, fullName, audioPath });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la canción', error });
  }
});

router.get('/random', async (req, res) => {
  try {
    const randomSong = await Song.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomSong[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener canción aleatoria' });
  }
});

module.exports = router;