import { createContext, Dispatch, SetStateAction } from 'react';
import { DrawMode } from './hooks/useDrawMode';
interface AppContext {
  setErrorText: (text: string, timeout?: number) => void;
  forceRerender: () => void;
  image: ImageData | null;
  readImageFile: (file: Blob) => void;
  drawMode: DrawMode;
  setDrawMode: Dispatch<SetStateAction<DrawMode>>;
}

const appContextDefaultValue: AppContext = {
  setErrorText: () => {},
  forceRerender: () => {},
  image: null,
  readImageFile: () => {},
  drawMode: DrawMode.Brush,
  setDrawMode: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
