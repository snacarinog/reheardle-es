import { useRef, useState, useEffect, useCallback } from 'react';
import AudioPlayer from './components/AudioPlayer';
import GuessInput from './components/GuessInput';
import ProgressBar from './components/ProgressBar';

function App() {
  const maxAttempts = 5;

  const [song, setSong] = useState(null);              // canción actual desde la API
  const [guess, setGuess] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attemptColors, setAttemptColors] = useState([]);

  const audioRef = useRef();

  // 🔁 Obtener canción aleatoria desde el backend
  const fetchRandomSong = useCallback(async () => {
    try {
      const res = await fetch('/api/songs/random');
      const data = await res.json();
      setSong(data);
      setGuess('');
      setAttempt(0);
      setIsCorrect(null);
      setAttemptColors([]);
    } catch (err) {
      console.error('Error al obtener canción aleatoria:', err);
    }
  }, []);

  useEffect(() => {
    fetchRandomSong();
  }, [fetchRandomSong]);

  const advanceAttempt = () => {
    setAttempt(prev => Math.min(prev + 1, maxAttempts));
    setGuess('');
    if (audioRef.current) {
      audioRef.current.playFragment(); // Reinicia audio con nuevo fragmento
    }
  };

  const handleGuess = () => {
    if (!guess.trim() || !song) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const correctAnswer = `${song.artist} - ${song.title}`.toLowerCase();

    if (normalizedGuess === correctAnswer) {
      setIsCorrect(true);
      setAttemptColors(prev => {
        const newColors = [...prev];
        newColors[attempt] = '#4ade80'; // verde
        return newColors;
      });
    } else {
      setIsCorrect(false);
      setAttemptColors(prev => {
        const newColors = [...prev];
        newColors[attempt] = '#f87171'; // rojo
        return newColors;
      });
      advanceAttempt();
    }
  };

  const handleSkip = () => {
    setAttemptColors(prev => {
      const newColors = [...prev];
      newColors[attempt] = '#f87171';
      return newColors;
    });
    advanceAttempt();
  };

  const handleRestart = () => {
    fetchRandomSong(); // nueva canción
  };

  const gameOver = attempt >= maxAttempts && !isCorrect;

  return (
    <div style={{ padding: 20 }}>
      <h1>🎧 Adivina la canción</h1>

      {song ? (
        <>
          <AudioPlayer
            ref={audioRef}
            src={song.audioPath}
            fragmentIndex={attempt}
            disabled={gameOver || isCorrect}
          />

          <ProgressBar
            current={attempt}
            total={maxAttempts}
            attemptColors={attemptColors}
          />

          {!isCorrect && !gameOver && (
            <GuessInput
              guess={guess}
              setGuess={setGuess}
              onSubmit={handleGuess}
              onSkip={handleSkip}
            />
          )}

          {isCorrect && (
            <p>✅ ¡Correcto! Era: {song.artist} - {song.title}</p>
          )}
          {gameOver && (
            <p>❌ Fin del juego. Era: {song.artist} - {song.title}</p>
          )}

          {(isCorrect || gameOver) && (
            <button onClick={handleRestart} style={{ marginTop: '10px' }}>
              🔁 Volver a jugar
            </button>
          )}
        </>
      ) : (
        <p>Cargando canción...</p>
      )}
    </div>
  );
}

export default App;