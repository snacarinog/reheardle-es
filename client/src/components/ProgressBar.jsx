function ProgressBar({ attemptColors, total }) {
  return (
    <div style={{ display: 'flex', gap: '4px', margin: '10px 0' }}>
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          style={{
            width: '30px',
            height: '10px',
            backgroundColor: attemptColors[i] || '#ccc', // default gray
            borderRadius: '3px',
          }}
        />
      ))}
    </div>
  );
}

export default ProgressBar;
