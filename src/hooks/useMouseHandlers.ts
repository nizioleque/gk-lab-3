import { useContext, useRef, MouseEvent, useEffect } from 'react';
import { AppContext } from '../AppContext';
import fillPolygon from '../fillPolygon';
import { BRUSH_RADIUS, POINT_RADIUS } from './useDraw';
import { DrawMode } from './useDrawMode';

export interface Point {
  x: number;
  y: number;
}

export interface DrawState {
  polygon?: Point[];
  currentMousePosition?: Point;
  brushPosition?: Point;
  isPressed?: boolean;
  paintedPixels?: boolean[][];
}

export default function useMouseHandlers(
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  draw: (drawState: DrawState) => Promise<void>
) {
  const { drawMode, image, filter, refreshHistogram } = useContext(AppContext);
  const drawState = useRef<DrawState>({});

  useEffect(() => {
    if (drawMode == DrawMode.Brush) {
      drawState.current.polygon = undefined;
      drawState.current.currentMousePosition = undefined;
    }
    if (drawMode == DrawMode.Polygon) {
      drawState.current.brushPosition = undefined;
      drawState.current.isPressed = false;
      drawState.current.paintedPixels = undefined;
    }
  }, [drawMode]);

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
        const currentMousePosition = getMousePosition(event);
        if (
          drawState.current.polygon &&
          drawState.current.polygon.length >= 2 &&
          isInPoint(drawState.current.polygon[0], currentMousePosition)
        ) {
          const w = canvasRef.current?.width ?? 100;
          const h = canvasRef.current?.height ?? 100;
          fillPolygon(image!, drawState.current.polygon, filter.fn, w, h);
          drawState.current.polygon = undefined;
          drawState.current.currentMousePosition = undefined;
          refreshHistogram();
        } else {
          if (!drawState.current.polygon) {
            drawState.current.polygon = [];
          }
          drawState.current.polygon.push(currentMousePosition);
          drawState.current.currentMousePosition = currentMousePosition;
        }
        draw(drawState.current);
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
        if (drawState.current.polygon) {
          const currentMousePosition = getMousePosition(event);
          drawState.current.currentMousePosition = currentMousePosition;
          draw(drawState.current);
        }
        break;
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    switch (drawMode) {
      case DrawMode.Brush:
        drawState.current.isPressed = false;
        drawState.current.paintedPixels = undefined;
        refreshHistogram();
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    switch (drawMode) {
      case DrawMode.Brush:
        drawState.current.isPressed = false;
        drawState.current.paintedPixels = undefined;
        refreshHistogram();
        draw(drawState.current);
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave };
}

function distSq(p1: Point, p2: Point): number {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

function isInPoint(point: Point, mousePosition: Point): boolean {
  return distSq(point, mousePosition) <= POINT_RADIUS * POINT_RADIUS * 4;
}
