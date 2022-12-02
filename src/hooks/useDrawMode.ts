import { useState } from 'react';

export enum DrawMode {
  Brush,
  Polygon,
}

export default function useDrawMode() {
  const [drawMode, setDrawMode] = useState<DrawMode>(DrawMode.Brush);
  return { drawMode, setDrawMode };
}
