import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import useCanvas from '../hooks/useCanvas';
import useDraw from '../hooks/useDraw';

const SIZE = 500;

function Canvas() {
  const {} = useContext(AppContext);

  const { canvasCtx, canvasRef } = useCanvas();
  const { draw } = useDraw(canvasCtx);

  useEffect(() => {
    draw();
  }, []);

  return <canvas ref={canvasRef} width={SIZE} height={SIZE} />;
}

export default Canvas;
