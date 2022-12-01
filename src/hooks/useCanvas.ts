import { useEffect, useRef } from 'react';

export default function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current)
      canvasCtx.current = canvasRef.current.getContext('2d');
  }, [canvasRef.current]);

  return { canvasRef, canvasCtx: canvasCtx.current };
}
