function SingleProgressBar({ totalSeconds, currentSeconds }) {
    const totalFragments = [2,3,5,9,15]; 
    const maxWidth = totalSeconds * 10;
    const fillWidth = Math.min(currentSeconds * 10, maxWidth);

  // Generar las marcas verticales
  const markers = Array.from({ length: 4  }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        left: `${(totalFragments[i]) * 10}px`,
        top: 0,
        bottom: 0,
        width: '1px',
        backgroundColor: '#888',
        opacity: 0.5,
      }}
    />
  ));

  return (
    <div
      style={{
        position: 'relative',
        width: `${maxWidth}px`,
        height: '15px',
        backgroundColor: '#ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '10px 0',
      }}
    >
      {/* Fondo de progreso */}
      <div
        style={{
          width: `${fillWidth}px`,
          height: '100%',
          backgroundColor: '#4ade80',
          transition: 'width 0.1s linear',
        }}
      />

      {/* Marcas verticales */}
      {markers}
    </div>
  );
}

export default SingleProgressBar;
