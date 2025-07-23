function GuessInput({ guess, setGuess, onSubmit, onSkip }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="¿Quién canta?"
      />
      <button onClick={onSubmit}>Enviar</button>
      <button onClick={onSkip}>Saltar</button>
    </div>
  );
}

export default GuessInput;
