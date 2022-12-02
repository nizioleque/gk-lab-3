import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import useCanvas from '../hooks/useCanvas';
import useDraw from '../hooks/useDraw';
import useMouseHandlers from '../hooks/useMouseHandlers';

function Canvas() {
  const { image } = useContext(AppContext);

  const { canvasCtx, canvasRef } = useCanvas();
  const { draw } = useDraw(canvasCtx);
  const { handleMouseDown, handleMouseMove, handleMouseUp } =
    useMouseHandlers(canvasRef);

  useEffect(() => {
    draw();
  }, [image]);

  return (
    <canvas
      ref={canvasRef}
      width={image?.width}
      height={image?.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

export default Canvas;
