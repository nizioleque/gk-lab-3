import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { DrawState } from './useMouseHandlers';

export const BRUSH_RADIUS = 40;
export const POINT_RADIUS = 6;

export default function useDraw(canvasCtx: CanvasRenderingContext2D | null) {
  const { image } = useContext(AppContext);

  const draw = async (drawState?: DrawState) => {
    if (!image || !canvasCtx) return;
    canvasCtx.putImageData(image, 0, 0);

    if (drawState?.polygon && drawState.polygon.length >= 1) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(drawState.polygon[0]!.x, drawState.polygon[0]!.y);
      for (let i = 1; i < drawState.polygon.length; i++) {
        canvasCtx.lineTo(drawState.polygon[i]!.x, drawState.polygon[i]!.y);
      }
      canvasCtx.lineTo(
        drawState.currentMousePosition!.x,
        drawState.currentMousePosition!.y
      );
      canvasCtx.strokeStyle = 'black';
      canvasCtx.lineWidth = 4;
      canvasCtx.stroke();

      for (let i = 0; i < drawState.polygon.length; i++) {
        canvasCtx.beginPath();
        canvasCtx.arc(
          drawState.polygon[i]!.x,
          drawState.polygon[i]!.y,
          POINT_RADIUS,
          0,
          2 * Math.PI
        );
        canvasCtx.fill();
        canvasCtx.strokeStyle = 'white';
        canvasCtx.lineWidth = 2;
        canvasCtx.stroke();
      }
    }

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
