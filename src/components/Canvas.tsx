import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import useCanvas from '../hooks/useCanvas';
import useDraw from '../hooks/useDraw';

function Canvas() {
  const { image } = useContext(AppContext);

  const { canvasCtx, canvasRef } = useCanvas();
  const { draw } = useDraw(canvasCtx);

  useEffect(() => {
    draw();
  }, [image]);

  return <canvas ref={canvasRef} width={image?.width} height={image?.height} />;
}

export default Canvas;
