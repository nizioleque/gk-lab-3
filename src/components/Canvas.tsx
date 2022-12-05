import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import useCanvas from '../hooks/useCanvas';
import useDraw from '../hooks/useDraw';
import useMouseHandlers from '../hooks/useMouseHandlers';

function Canvas() {
  const { image, imageEffectTrigger } = useContext(AppContext);

  const { canvasCtx, canvasRef } = useCanvas();
  const { draw } = useDraw(canvasCtx);
  const { handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
    useMouseHandlers(canvasRef, draw);

  useEffect(() => {
    draw();
  }, [image, imageEffectTrigger]);

  return (
    <canvas
      ref={canvasRef}
      width={image?.width}
      height={image?.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default Canvas;
