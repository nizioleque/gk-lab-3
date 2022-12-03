import { useContext, useRef, MouseEvent } from 'react';
import { AppContext } from '../AppContext';
import { BRUSH_RADIUS } from './useDraw';
import { DrawMode } from './useDrawMode';

interface Point {
  x: number;
  y: number;
}

export interface DrawState {
  polygon?: Point[];
  brushPosition?: Point;
  isPressed?: boolean;
  paintedPixels?: boolean[][];
}

export default function useMouseHandlers(
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  draw: (drawState: DrawState) => Promise<void>
) {
  const { drawMode, image, filter } = useContext(AppContext);
  const drawState = useRef<DrawState>({});

  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return {
      x: (event.clientX - rect.left) << 0,
      y: (event.clientY - rect.top) << 0,
    };
  };

  const handleMouseDown = (event: MouseEvent) => {
    switch (drawMode) {
      case DrawMode.Brush:
        const w = canvasRef.current?.width ?? 100;
        const h = canvasRef.current?.height ?? 100;
        drawState.current.isPressed = true;
        drawState.current.paintedPixels = Array.from(
          Array(w),
          () => new Array(h)
        );
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!image) return;
    switch (drawMode) {
      case DrawMode.Brush:
        const pos = getMousePosition(event);
        drawState.current.brushPosition = pos;

        if (drawState.current.isPressed) {
          const w = canvasRef.current?.width ?? 100;
          const h = canvasRef.current?.height ?? 100;
          const iMin = Math.max(0, pos.x - BRUSH_RADIUS);
          const iMax = Math.min(w, pos.x + BRUSH_RADIUS);
          const jMin = Math.max(0, pos.y - BRUSH_RADIUS);
          const jMax = Math.min(h, pos.y + BRUSH_RADIUS);
          for (let i = iMin; i < iMax; i++) {
            for (let j = jMin; j < jMax; j++) {
              if (
                distSq(pos, { x: i, y: j }) <= BRUSH_RADIUS * BRUSH_RADIUS &&
                !drawState.current.paintedPixels![i][j]
              ) {
                image.data[(j * w + i) * 4 + 0] = filter.fn(
                  image.data[(j * w + i) * 4 + 0]
                );
                image.data[(j * w + i) * 4 + 1] = filter.fn(
                  image.data[(j * w + i) * 4 + 1]
                );
                image.data[(j * w + i) * 4 + 2] = filter.fn(
                  image.data[(j * w + i) * 4 + 2]
                );
                drawState.current.paintedPixels![i][j] = true;
              }
            }
          }
        }

        draw(drawState.current);
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    switch (drawMode) {
      case DrawMode.Brush:
        drawState.current.isPressed = false;
        drawState.current.paintedPixels = undefined;
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    drawState.current.brushPosition = undefined;
    draw(drawState.current);
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave };
}

function distSq(p1: Point, p2: Point): number {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}
