import { MutableRefObject, useContext } from 'react';
import { AppContext } from '../AppContext';

export default function useDraw(
  canvasCtx: MutableRefObject<CanvasRenderingContext2D | undefined>
) {
  const {} = useContext(AppContext);

  const draw = async () => {};

  return { draw };
}
