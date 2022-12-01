import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function useDraw(canvasCtx: CanvasRenderingContext2D | null) {
  const { image } = useContext(AppContext);

  const draw = async () => {
    if (!image || !canvasCtx) return;
    canvasCtx.putImageData(image, 0, 0);
  };

  return { draw };
}
