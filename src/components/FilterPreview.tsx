import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../AppContext';

function FilterPreview() {
  const { filter } = useContext(AppContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, 256, 256);
    ctx.fillStyle = '#ffffff';
    for (let x = 0; x < 256; x++) {
      ctx.fillRect(x, 255 - clamp(filter.fn(x)), 2, 2);
    }
  }, [filter]);

  return (
    <canvas
      ref={canvasRef}
      width={256}
      height={256}
      style={{
        // border: '2px #555555 solid',
        backgroundColor: '#333333',
      }}
    />
  );
}

export default FilterPreview;

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 255) << 0;
}
