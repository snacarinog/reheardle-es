import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import SingleProgressBar from './SingleProgressBar';

const fragmentDurations = [2, 3, 5, 9, 15];

const AudioPlayer = forwardRef(({ src, fragmentIndex, disabled }, ref) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  const maxTime = fragmentDurations[fragmentIndex];

  const stopAudio = () => {
    clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const playFragment = () => {
    if (disabled || !audioRef.current) return;

    stopAudio(); // limpia antes

    const audio = audioRef.current;
    console.log(audioRef.current)
    audio.currentTime = 0;
    audio.play();

    intervalRef.current = setInterval(() => {
      if (audio.currentTime >= maxTime) {
        stopAudio();
      } else {
        setCurrentTime(audio.currentTime);
      }
    }, 100);
  };

  useImperativeHandle(ref, () => ({
    playFragment,
    stopAudio
  }));

  useEffect(() => {
    return () => {
      stopAudio(); // limpieza al desmontar
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} src={src} preload="auto" />
      <button onClick={playFragment} disabled={disabled}>
        ▶️ Escuchar {maxTime}s
      </button>
      <SingleProgressBar totalSeconds={fragmentDurations[4]} currentSeconds={currentTime} />
    </div>
  );
});

export default AudioPlayer;
