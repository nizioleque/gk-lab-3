import { useContext, useEffect, useRef, MouseEvent } from 'react';
import { AppContext } from '../AppContext';
import { DrawMode } from './useDrawMode';

interface Point {
  x: number;
  y: number;
}

interface DrawState {
  polygon?: Point[];
  brushPosition?: Point;
  paintedPixels?: boolean[];
}

export default function useMouseHandlers(
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) {
  const { drawMode } = useContext(AppContext);

  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return {
      x: (event.clientX - rect.left) << 0,
      y: (event.clientY - rect.top) << 0,
    };
  };

  const drawState = useRef<DrawState>({});

  useEffect(() => {}, [drawMode]);

  const handleMouseDown = (event: MouseEvent) => {
    console.log('mouseDown');
    switch (drawMode) {
      case DrawMode.Brush:
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    console.log('mouseMove');
    switch (drawMode) {
      case DrawMode.Brush:
        drawState.current.brushPosition = getMousePosition(event);
        console.log('new brush pos: ', drawState.current.brushPosition);
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    console.log('mouseUp');
    switch (drawMode) {
      case DrawMode.Brush:
        break;
      case DrawMode.Polygon:
        break;
    }
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp, drawState };
}
