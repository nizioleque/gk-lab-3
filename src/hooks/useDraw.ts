import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { DrawState } from './useMouseHandlers';

export const BRUSH_RADIUS = 40;

export default function useDraw(canvasCtx: CanvasRenderingContext2D | null) {
  const { image } = useContext(AppContext);

  const draw = async (drawState?: DrawState) => {
    if (!image || !canvasCtx) return;
    canvasCtx.putImageData(image, 0, 0);

    if (drawState?.brushPosition) {
      canvasCtx.beginPath();
      canvasCtx.arc(
        drawState.brushPosition.x,
        drawState.brushPosition.y,
        BRUSH_RADIUS,
        0,
        2 * Math.PI
      );
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
    }
  };

  return { draw };
}
