function GuessInput({ guess, setGuess, onSubmit, onSkip, suggestions }) {
  const showSuggestions = guess.trim().length > 0 && suggestions.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', position: 'relative' }}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="¿Quién canta?"
        style={{ padding: '10px', fontSize: '16px' }}
      />

      {showSuggestions && (
        <ul style={{
          position: 'absolute',
          top: '45px',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          zIndex: 10,
          maxHeight: '150px',
          overflowY: 'auto',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: idx !== suggestions.length - 1 ? '1px solid #eee' : 'none'
              }}
              onClick={() => setGuess(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: showSuggestions ? '160px' : '0px' }}>
        <button
          onClick={onSubmit}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
        <button
          onClick={onSkip}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Saltar
        </button>
      </div>
    </div>
  );
}


export default GuessInput;

